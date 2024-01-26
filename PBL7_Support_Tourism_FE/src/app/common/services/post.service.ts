import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config';
import { PostResponse } from '../models';
import { Observable, finalize } from 'rxjs';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    public apiPostUrl = ApiPath.POST;
    public apIAccountUrl = ApiPath.ACCOUNT;

    constructor(
        public loadingDialog: LoadingSpinnerDialogService,
        private http: HttpClient
    ) { }

    public getPostsByAccount(accountId: string, page?: number, sort?: string): Observable<PostResponse> {
        this.loadingDialog.showSpinner(true);

        const url = `${this.apIAccountUrl}/${accountId}/timeline`;
        const httpParams = new HttpParams()
            .set('page', page ? page : 1)
            .set('sort', sort ? sort : 'desc')

        return this.http.get<PostResponse>(url, { params: httpParams }).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public createPost(post: FormData): Observable<PostResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<PostResponse>(this.apiPostUrl, post).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
