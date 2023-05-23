import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';
import { TourismResponse } from '../models';

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
            .pipe(finalize(() => this.loadingDialog.showSpinner(false)))
    }
}
