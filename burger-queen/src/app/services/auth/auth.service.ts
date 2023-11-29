import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestHandler } from '../../utils/requestHandler';
import { CredentialLogin, LoginResponse, requestResponse, systemUser } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment._API_URL;
  private loginHandler!: requestHandler<LoginResponse, CredentialLogin>;
  public loginResponse$!: Subject<requestResponse<LoginResponse>>;
  public systemUser$ = new BehaviorSubject<systemUser>({
    id: '',
    accessToken: '',
    role: '',
    email: '',
  });
  public isLoading = false;
  public response!: requestResponse<LoginResponse>;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.loginHandler = new requestHandler<LoginResponse, CredentialLogin>(
      this.http
    );
    this.loginResponse$ = this.loginHandler.response$;

    this.loginResponse$.subscribe((state) => {
      if (state.data) {
        const newUser = {
          id: state.data.user.id.toString(),
          accessToken: state.data.accessToken,
          role: state.data.user.role,
          email: state.data.user.email,
        };
        this.systemUser$.next(newUser);
      }
      // if(state.error !== null) alert(state.error.message);
    });
    this.systemUser$.subscribe((user) => {
      this.localStorageService.clearStorage();
      if(user.accessToken !== '') {
        this.localStorageService.setStorage('accessToken', user.accessToken);
        this.localStorageService.setStorage('role', user.role);
        this.localStorageService.setStorage('idUser', user.id);
      }
    });
  }

    // Users
    proceedLoginUser(credentials: CredentialLogin): void{
    // proceedLoginUser(credentials: CredentialLogin) {
      // console.log(credentials);
      this.isLoading = true;
      // const url = `${this.apiurl}/users`;
      const url = `${this.apiUrl}/login`;
      // console.log(url);
      // let body = credentials;
      //   const body = { 
      //     "name": "", 
      //     "password": "123456", 
      //     "email": "caropugo@gmail", 
      //     "role": "", 
      //     "isactive": false 
      // };
      this.loginHandler.makeCall('POST', url, credentials);
      this.loginHandler.response$.subscribe((res) => {
        // console.log(res);
        // console.log(res.error?.message);
        this.isLoading = res.isLoading;
        // console.log(res.error?.message);
        // alert('User logged');
        this.response = res;
      });
      // return this.loginResponse$;
      // return new Observable(observer => {
      //   alert('Started Observable');
      //   observer.next(this.response);
      //   observer.complete();
      //   alert('Compeleted Observable');
      // });  
  }
  
}
