import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config';
import { ResortModel, ResortResponse } from '../models';
import { Observable, finalize } from 'rxjs';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';

@Injectable({
    providedIn: 'root'
})
export class ResortService {
    public apiResortUrl = ApiPath.RESORT;
    public apiTourismUrl = ApiPath.TOURISM;
    public apiResortByAccountUrl = ApiPath.RESORT_BY_ACCOUNT;

    constructor(
        private http: HttpClient,
        private loadingDialog: LoadingSpinnerDialogService
    ) { }

    public getResortsAndSearch(): Observable<ResortResponse> {
        return this.http.get<ResortResponse>(this.apiResortUrl);
    }

    public getResortsByTourismId(tourismId: string | null): Observable<ResortResponse> {
        tourismId = tourismId ? tourismId : '';
        const url = `${this.apiTourismUrl}/${tourismId}/resorts`;

        return this.http.get<ResortResponse>(url);
    }

    public getResortByAccount(): Observable<ResortResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<ResortResponse>(this.apiResortByAccountUrl).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public createResort(resort: ResortModel): Observable<ResortResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<ResortResponse>(this.apiResortUrl, resort).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public updateResort(resort: ResortModel): Observable<ResortResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.put<ResortResponse>(this.apiResortUrl, resort).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public deleteResort(resort: ResortModel): Observable<ResortResponse> {
        this.loadingDialog.showSpinner(true);

        const httpOptions = {
            header: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: resort
        }

        return this.http.delete<ResortResponse>(this.apiResortUrl, httpOptions).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
