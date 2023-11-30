import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment._API_URL;
  // private registerHandler!: requestHandler<AuthResponse, CredentialRegister>;
  // public registerResponse$!: Subject<requestResponse<AuthResponse>>;
  // private loginHandler!: requestHandler<AuthResponse, CredentialLogin>;
  // public loginResponse$!: Subject<requestResponse<AuthResponse>>;
  // public systemUser$ = new BehaviorSubject<systemUser>({
  //   id: '',
  //   accessToken: '',
  //   role: '',
  //   email: '',
  // });
  // public isLoading = false;
  // public response!: requestResponse<AuthResponse>;

  constructor(
    private http: HttpClient,
    // private localStorageService: LocalStorageService
  ) {
    // this.initLogin();
    // this.initRegister();
  }

  // initLogin() {
  //   this.loginHandler = new requestHandler<AuthResponse, CredentialLogin>(
  //     this.http
  //   );
  //   this.loginResponse$ = this.loginHandler.response$;

  //   this.loginResponse$.subscribe((state) => {
  //     if (state.data) {
  //       const newUser = {
  //         id: state.data.user.id.toString(),
  //         accessToken: state.data.accessToken,
  //         role: state.data.user.role,
  //         email: state.data.user.email,
  //       };
  //       this.systemUser$.next(newUser);
  //     }
  //   });
  //   this.systemUser$.subscribe((user) => {
  //     this.localStorageService.clearStorage();
  //     if(user.accessToken !== '') {
  //       this.localStorageService.setStorage('accessToken', user.accessToken);
  //       this.localStorageService.setStorage('role', user.role);
  //       this.localStorageService.setStorage('idUser', user.id);
  //       sessionStorage.setItem('accessToken', user.accessToken);
  //       sessionStorage.setItem('role', user.role);
  //       sessionStorage.setItem('idUser', user.id);
  //     }
  //   });
  // }

  // initRegister(){
  //   this.registerHandler = new requestHandler<AuthResponse, CredentialRegister>(
  //     this.http
  //   );
  //   this.registerResponse$ = this.registerHandler.response$;
  // }
  
  // Users
  // proceedLoginUser(credentials: CredentialLogin): void{
  //   this.isLoading = true;
  //   const url = `${this.apiUrl}/login`;
  //   this.loginHandler.makeCall('POST', url, credentials);
  //   this.loginHandler.response$.subscribe((res) => {
  //     this.isLoading = res.isLoading;
  //     this.response = res;
  //   });
  // }

  // proceedRegisterUser(credentials: CredentialRegister): void{
  //   this.isLoading = true;
  //   const url = `${this.apiUrl}/users`;
  //   this.registerHandler.makeCall('POST', url, credentials);
  //   this.registerHandler.response$.subscribe((res) => {
  //     this.isLoading = res.isLoading;
  //     this.response = res;
  //   });
  // }

  getAllOrders() {
    const url = `${this.apiUrl}/orders`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
    // Configuración de parámetros de consulta
    // const params = new HttpParams()
    //   .set('parametro1', 'valor1')
    //   .set('parametro2', 'valor2');
    return this.http.get(url, {headers: headers});
  }

  getAllProducts() {
    const url = `${this.apiUrl}/products`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
    // Configuración de parámetros de consulta
    // const params = new HttpParams()
    //   .set('parametro1', 'valor1')
    //   .set('parametro2', 'valor2');
    return this.http.get(url, {headers: headers});
  }

  getAllStatusOrder() {
    const url = `${this.apiUrl}/statusOrder`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      // 'Access-Control-Allow-Origin': this.apiUrl
    });
    return this.http.get(url, {headers: headers});
  }

  getOrderById(code: number) {
    const url = `${this.apiUrl}/orders/${code}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      // 'Access-Control-Allow-Origin': this.apiUrl
    });
    return this.http.get(url, {headers: headers});
  }

  // updateUser(code: number, inputdata: updateUserRole) {
  //   const url = `${this.apiUrl}/users/${code}`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  //   });
    // // Configuración de parámetros de consulta
    // const params = new HttpParams()
    //   .set('role', inputdata.role)
    //   .set('isactive', inputdata.isactive);
    // const options =  { headers: headers, params: params };
  //   return this.http.patch(url, inputdata, { headers: headers});
  // }

  isLoggedIn(){
    return sessionStorage.getItem('idUser')!= null;
  }

  getUserRole(){
    return sessionStorage.getItem('role')!= null ? sessionStorage.getItem('role')?.toString() : '';
  }

}
