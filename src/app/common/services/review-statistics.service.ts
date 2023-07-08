import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { ReviewStatisticsResponse } from '../models/reviewStatistics.model';

@Injectable({
    providedIn: 'root'
})
export class ReviewStatisticsService {
    public apiReviewStatisticsUrl = ApiPath.REVIEW_STATISTICS;
    public apiTourismReviewTopUrl = ApiPath.TOURISM_REVIEW_TOP;
    public apiResortReviewTopUrl = ApiPath.RESORT_REVIEW_TOP;

    constructor(
        private http: HttpClient
    ) { }

    public getTourismReviewTop(): Observable<ReviewStatisticsResponse> {
        return this.http.get<ReviewStatisticsResponse>(this.apiTourismReviewTopUrl);
    }

    public getResortReviewTop(): Observable<ReviewStatisticsResponse> {
        return this.http.get<ReviewStatisticsResponse>(this.apiResortReviewTopUrl);
    }

    public setAvgPositivePercentTourism(tourismId: string): Observable<ReviewStatisticsResponse> {
        const url = `${this.apiReviewStatisticsUrl}/tourisms/${tourismId}`;
        return this.http.get<ReviewStatisticsResponse>(url);
    }

    public setAvgPositivePercentResort(resortId: string): Observable<ReviewStatisticsResponse> {
        const url = `${this.apiReviewStatisticsUrl}/resorts/${resortId}`;
        return this.http.get<ReviewStatisticsResponse>(url);
    }
}
