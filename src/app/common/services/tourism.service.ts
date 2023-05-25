import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';
import { CategoryModel, TourismResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TourismService {
    private apiTourismUrl = ApiPath.TOURISM;
    private apiCategoryUrl = ApiPath.CATEGORY;

    constructor(
        private http: HttpClient,
        private loadingDialog: LoadingSpinnerDialogService
    ) { }

    public getTourismsAndSearch(): Observable<TourismResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<TourismResponse>(this.apiTourismUrl)
            .pipe(finalize(() => this.loadingDialog.showSpinner(false)));
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
}