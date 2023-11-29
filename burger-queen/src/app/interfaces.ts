export interface requestResponse<DataType> {
    isLoading: boolean;
    error: import('@angular/common/http').HttpErrorResponse | Error | null;
    data: DataType | null;
  }

export interface HttpRequestOptions {
    headers?: import('@angular/common/http').HttpHeaders;
    context?: import('@angular/common/http').HttpContext;
    reportProgress?: boolean;
    params?: import('@angular/common/http').HttpParams;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

export type HttpMethods =
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'JSONP'
    | 'OPTIONS';

export interface UserInformation {
    email: string;
    role: string;
    id: number;
    isactive: boolean;
    name: string;
}
    
export interface CredentialRegister {
    email: string;
    password: string;
    name: string, 
    role: string, 
    isactive: boolean
}

export interface CredentialLogin {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: UserInformation;
}

export interface systemUser {
    id: string;
    accessToken: string;
    role: string;
    email: string;
}
