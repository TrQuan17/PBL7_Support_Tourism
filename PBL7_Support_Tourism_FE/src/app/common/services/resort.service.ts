import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    public getResortsAndSearch(q?: string, page?: number, size?: number): Observable<ResortResponse> {
        this.loadingDialog.showSpinner(true);

        const httpParams = new HttpParams()
            .set('q', q ? q : '')
            .set('page', page ? page : '')
            .set('size', size || size === 0 ? size : 5)

        return this.http.get<ResortResponse>(this.apiResortUrl, { params: httpParams }).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getResortById(resortId: string): Observable<ResortResponse> {
        return this.http.get<ResortResponse>(`${this.apiResortUrl}/${resortId}`);
    }

    public getResortsByTourism(tourismId: string): Observable<ResortResponse> {
        const url = `${this.apiTourismUrl}/${tourismId}/resorts`;
        return this.http.get<ResortResponse>(url);
    }

    public getResortByAccount(q?: string, page?: number): Observable<ResortResponse> {
        this.loadingDialog.showSpinner(true);

        const httpParams = new HttpParams()
            .set('q', q ? q : '')
            .set('page', page ? page : '')

        return this.http.get<ResortResponse>(this.apiResortByAccountUrl, { params: httpParams }).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public createResort(resort: FormData): Observable<ResortResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<ResortResponse>(this.apiResortUrl, resort).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public updateResort(resort: FormData): Observable<ResortResponse> {
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
