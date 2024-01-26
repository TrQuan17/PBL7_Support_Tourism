import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';
import { TourismModel, TourismResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TourismService {
    private apiTourismUrl = ApiPath.TOURISM;
    private apiCategoryUrl = ApiPath.CATEGORY;
    private apiTourismByAccountUrl = ApiPath.TOURISM_BY_ACCOUNT;

    constructor(
        private http: HttpClient,
        private loadingDialog: LoadingSpinnerDialogService
    ) { }

    public getTourismsAndSearch(q?: string, page?: number, size? : number): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        const httpParams = new HttpParams()
            .set('q', q ? q : '')
            .set('page', page ? page : 1)
            .set('size', size || size === 0 ? size : 5)

        return this.http.get<TourismResponse>(this.apiTourismUrl, {params: httpParams}).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getTourismByAccount(q?: string, page?: number): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        const httpParams = new HttpParams()
            .set('q', q ? q : '')
            .set('page', page ? page : 1)

        return this.http.get<TourismResponse>(this.apiTourismByAccountUrl, { params: httpParams }).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getTourismsByCategory(categoryId: string, q?: string, page?: number): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        const httpParams = new HttpParams()
            .set('q', q ? q : '')
            .set('page', page ? page : 1)

        const url = `${this.apiCategoryUrl}/${categoryId}/tourisms`;

        return this.http.get<TourismResponse>(url, {params: httpParams}).pipe(
            finalize(() => this.loadingDialog.showSpinner(false)));
    }

    public getTourismById(tourismId: string): Observable<TourismResponse> {
        return this.http.get<TourismResponse>(`${this.apiTourismUrl}/${tourismId}`);
    }

    public createTourism(tourism: FormData): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);
        return this.http.post<TourismResponse>(this.apiTourismUrl, tourism).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public updateTourism(tourism: FormData): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);
        return this.http.put<TourismResponse>(this.apiTourismUrl, tourism).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public deleteTourism(tourism: TourismModel): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        const httpOptions = {
            header: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: tourism
        }

        return this.http.delete<TourismResponse>(this.apiTourismUrl, httpOptions).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}