import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';
import { CategoryModel, TourismModel, TourismResponse } from '../models';

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

    public getTourismsAndSearch(): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<TourismResponse>(this.apiTourismUrl)
            .pipe(finalize(() => this.loadingDialog.showSpinner(false)));
    }

    public getTourismByAccount(): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<TourismResponse>(this.apiTourismByAccountUrl).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getTourismsByCategory(category: CategoryModel): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        const url = `${this.apiCategoryUrl}/${category._id}/tourisms`;

        return this.http.get<TourismResponse>(url).pipe(
            finalize(() => this.loadingDialog.showSpinner(false)));
    }

    public getTourismById(tourismId: string): Observable<TourismResponse> {
        return this.http.get<TourismResponse>(`${this.apiTourismUrl}/${tourismId}`);
    }

    public createTourism(tourism: TourismModel): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);
        return this.http.post<TourismResponse>(this.apiTourismUrl, tourism).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public updateTourism(tourism: TourismModel): Observable<TourismResponse> {
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