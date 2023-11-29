import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { HttpMethods, HttpRequestOptions, requestResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class requestHandler <ResultType,BodyType> {

    constructor(private httpClient: HttpClient) {}

    response$ = new Subject<requestResponse<ResultType>>()

    makeCall(method: HttpMethods, url:string, body:BodyType | null = null, requestOptions: HttpRequestOptions | null = null ): void {
    // console.log(method);
    // console.log(url);
    // console.log(body);
    // console.log(requestOptions);
    this.response$.next({ isLoading: true, error: null, data: null });
    this.httpClient.request(method, url, {...requestOptions, body}).subscribe({
        next: (v) => {
            // console.log(v);
            if(v.user.isactive){
              return this.response$.next({  isLoading: false, error: null, data: v as ResultType})
            } else {
              return this.response$.next({ isLoading: false, error: new Error('In active user'), data: null })
            }
        },
        error: (e) => {
            // console.log(e);
            // console.log(e.error);
            if(e.error === 'Cannot find user' || e.error === 'Incorrect password'){
              e.message = 'Invalid credentials';
            } else {
              e.message = e.error;
            }
            return this.response$.next({ isLoading: false, error: e, data: null })
        },
        // complete: () => console.info('complete') 
    })
  }
}
