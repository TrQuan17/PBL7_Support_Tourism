import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewResponse } from '../models';
import { ApiPath } from 'src/app/core/config';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    public apiReviewUrl = ApiPath.REVIEW;
    public apiTourismUrl = ApiPath.TOURISM;

    constructor(private http: HttpClient) { }

    public getReviewsByTourismId(tourismId: string | null): Observable<ReviewResponse> {
        tourismId = tourismId ? tourismId : '';
        const url = `${this.apiTourismUrl}/${tourismId}/reviews`;

        return this.http.get<ReviewResponse>(url);
    }
}
