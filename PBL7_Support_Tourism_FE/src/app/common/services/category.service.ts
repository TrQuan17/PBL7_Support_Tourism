import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { CategoryModel, CategoryResponse } from '../models';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiCategoryUrl = ApiPath.CATEGORY;

    constructor(
        private loadingDialog: LoadingSpinnerDialogService,
        private http: HttpClient
    ) { }

    public getCategoriesAndSearch(q?: string, page?: number, size?: number): Observable<CategoryResponse> {
        this.loadingDialog.showSpinner(true);

        const httpParams = new HttpParams()
            .set('q', q ? q : '')
            .set('page', page ? page : 1)
            .set('size', size ? size : 0)

        return this.http.get<CategoryResponse>(this.apiCategoryUrl, { params: httpParams }).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public createCategory(category: FormData): Observable<CategoryResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<CategoryResponse>(this.apiCategoryUrl, category).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public updateCategory(category: FormData): Observable<CategoryResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.put<CategoryResponse>(this.apiCategoryUrl, category).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public deleteCategory(category: CategoryModel): Observable<CategoryResponse> {
        this.loadingDialog.showSpinner(true);

        const httpOptions = {
            header: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: category
        }

        return this.http.delete<CategoryResponse>(this.apiCategoryUrl, httpOptions).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
