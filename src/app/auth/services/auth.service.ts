import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { AuthResponse, LoginRequestModel, RegisterRequestModel } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public apiLoginUrl = ApiPath.LOGIN;
    public apiRegisterUrl = ApiPath.REGISTER;

    constructor(private http: HttpClient, private router: Router) { }

    public onRegister(account: RegisterRequestModel): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.apiRegisterUrl, account);
    }

    public onLogin(account: LoginRequestModel): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.apiLoginUrl, account);
    }

    public onLogout(): void {
        localStorage.removeItem('account');
        this.router.navigate(['home'])
    }
}
