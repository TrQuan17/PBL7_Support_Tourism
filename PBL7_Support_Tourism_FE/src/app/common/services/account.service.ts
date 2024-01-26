/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
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
    public apiUpdateAvatarUrl = ApiPath.UPDATE_AVATAR;
    public apiUpdateBackgroundUrl = ApiPath.UPDATE_BACKGROUND;
    public apiUpdatePasswordUrl = ApiPath.CHANGE_PASS;

    constructor(
        public loadingDialog: LoadingSpinnerDialogService,
        private http: HttpClient
    ) { }

    public getAllAccount(q?: string, page?: number): Observable<AccountResponse> {
        this.loadingDialog.showSpinner(true);

        const httpParams = new HttpParams()
            .set('q', q ? q : '')
            .set('page', page ? page : 1)

        return this.http.get<AccountResponse>(this.apiAccountUrl, { params: httpParams }).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getAuthAccount(): Observable<AccountResponse> {
        return this.http.get<AccountResponse>(this.apiAuthAccountUrl);
    }

    public getAccountGuest(accountId: string): Observable<AccountResponse> {
        return this.http.get<AccountResponse>(`${this.apiAccountUrl}/${accountId}`);
    }

    public updateAccount(account: any): Observable<AccountResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.patch<AccountResponse>(this.apiUpdateAccountUrl, account).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public updateAccountAvatar(avatar: FormData): Observable<AccountResponse> {
        return this.http.patch<AccountResponse>(this.apiUpdateAvatarUrl, avatar);
    }

    public updateAccountBackground(background: FormData): Observable<AccountResponse> {
        return this.http.patch<AccountResponse>(this.apiUpdateBackgroundUrl, background);
    }

    public updatePassword(pass: any): Observable<AccountResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.patch<AccountResponse>(this.apiUpdatePasswordUrl, pass).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
