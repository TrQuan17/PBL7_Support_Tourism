import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';
import { FavouriteModel, FavouriteResponse } from '../models';
import { Observable, finalize } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FavouriteService {
    public apiFavouriteUrl = ApiPath.FAVOURITE;
    public apiAuthFavouriteUrl = ApiPath.AUTH_FAVOURITE;

    constructor(
        private http: HttpClient,
        private loadingDialog: LoadingSpinnerDialogService
    ) { }

    public getAuthFavourite(): Observable<FavouriteResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<FavouriteResponse>(this.apiAuthFavouriteUrl).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public createFavourite(favourite: FavouriteModel): Observable<FavouriteResponse> {
        return this.http.post<FavouriteResponse>(this.apiFavouriteUrl, favourite);
    }

    public deleteFavourite(favourite: FavouriteModel): Observable<FavouriteResponse> {
        const httpOptions = {
            header: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: favourite
        }

        return this.http.delete<FavouriteResponse>(this.apiFavouriteUrl, httpOptions);
    }
}
