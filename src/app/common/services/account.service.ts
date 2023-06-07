import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { AccountResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    public apiAccountUrl = ApiPath.ACCOUNT;
    public apiAuthAccountUrl = ApiPath.AUTH_ACCOUNT;

    constructor(
        private http: HttpClient
    ) { }

    public getAuthAccount(): Observable<AccountResponse> {
        return this.http.get<AccountResponse>(this.apiAuthAccountUrl);
    }

    public getAccountGuest(accountId: string): Observable<AccountResponse> {
        return this.http.get<AccountResponse>(`${this.apiAccountUrl}/${accountId}`);
    }
}
