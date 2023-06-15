import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config';
import { PostModel, PostResponse } from '../models';
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

    public createPost(post: PostModel): Observable<PostResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<PostResponse>(this.apiPostUrl, post).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getPostsByAccount(accountId: string): Observable<PostResponse> {
        this.loadingDialog.showSpinner(true);

        const url = `${this.apIAccountUrl}/${accountId}/timeline`;
        return this.http.get<PostResponse>(url).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
