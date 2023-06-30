/* eslint-disable @typescript-eslint/no-explicit-any */
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
    public apiWriteReviewTourismUrl = ApiPath.WRITE_REVIEW_TOURISM;
    public apiWriteReviewResortUrl = ApiPath.WRITE_REVIEW_RESORT;
    public apiTourismUrl = ApiPath.TOURISM;
    public apiResortUrl = ApiPath.RESORT;
    public apiReviewClassify = ApiPath.REVIEW_CLASSIFY;

    constructor(private http: HttpClient) { }

    public getReviewsByTourism(tourismId: string): Observable<ReviewResponse> {
        const url = `${this.apiTourismUrl}/${tourismId}/reviews`;
        return this.http.get<ReviewResponse>(url);
    }

    public getReviewsByResort(resortId: string): Observable<ReviewResponse> {
        const url = `${this.apiResortUrl}/${resortId}/reviews`;
        return this.http.get<ReviewResponse>(url);
    }

    public checkAccountReviewTourism(tourismId: string): Observable<ReviewResponse> {
        const url = `${this.apiReviewUrl}/tourism/${tourismId}/check`;
        return this.http.get<ReviewResponse>(url);
    }

    public checkAccountReviewResort(resortId: string): Observable<ReviewResponse> {
        const url = `${this.apiReviewUrl}/resort/${resortId}/check`;
        return this.http.get<ReviewResponse>(url);
    }

    public createWithTourism(review: FormData): Observable<ReviewResponse> {
        return this.http.post<ReviewResponse>(this.apiWriteReviewTourismUrl, review);
    }

    public createWithResort(review: FormData): Observable<ReviewResponse> {
        return this.http.post<ReviewResponse>(this.apiWriteReviewResortUrl, review);
    }

    public reviewClassify(review: any): Observable<ReviewResponse> {
        console.log(review);
        return this.http.put<ReviewResponse>(this.apiReviewClassify, review);
    }
}
