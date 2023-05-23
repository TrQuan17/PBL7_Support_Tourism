import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../models';
import { ApiPath } from 'src/app/core/config';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiCategoryUrl = ApiPath.CATEGORY;

    constructor(
        private http: HttpClient
    ) { }

    public getCategories(): Observable<CategoryResponse> {
        return this.http.get<CategoryResponse>(this.apiCategoryUrl)
    }
}
