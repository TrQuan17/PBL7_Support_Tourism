import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { AccountResponse } from '../models';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    public apiAccountUrl = ApiPath.ACCOUNT;
    public apiAuthAccountUrl = ApiPath.AUTH_ACCOUNT;
    public apiUpdateAccountUrl = ApiPath.UPDATE_INFO;

    constructor(
        public loadingDialog: LoadingSpinnerDialogService,
        private http: HttpClient
    ) { }

    public getAllAccount(): Observable<AccountResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<AccountResponse>(this.apiAccountUrl).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getAuthAccount(): Observable<AccountResponse> {
        return this.http.get<AccountResponse>(this.apiAuthAccountUrl);
    }

    public getAccountGuest(accountId: string): Observable<AccountResponse> {
        return this.http.get<AccountResponse>(`${this.apiAccountUrl}/${accountId}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public updateAccount(account: any): Observable<AccountResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.patch<AccountResponse>(this.apiUpdateAccountUrl, account).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
