import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestHandler } from '../../utils/requestHandler';
import { Credentials, LoginResponse, requestResponse, systemUser } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment._API_URL;
  private loginHandler!: requestHandler<LoginResponse, Credentials>;
  public loginResponse$!: Subject<requestResponse<LoginResponse>>;
  public systemUser$ = new BehaviorSubject<systemUser>({
    id: '',
    accessToken: '',
    role: '',
    email: '',
  });
  public isLoading = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { 
    this.loginHandler = new requestHandler<LoginResponse, Credentials>(
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
      if(state.error !== null) alert('User not found');
    });
    this.systemUser$.subscribe((user) => {
      this.localStorageService.setStorage('accessToken', user.accessToken);
      this.localStorageService.setStorage('role', user.role);
      this.localStorageService.setStorage('idUser', user.id);
      if(user.accessToken !== '') alert('User logged');
    });
  }
}
