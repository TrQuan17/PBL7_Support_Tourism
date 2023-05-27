import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config';
import { ResortResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResortService {
    public apiResortUrl = ApiPath.RESORT;
    public apiTourismUrl = ApiPath.TOURISM;

    constructor(private http: HttpClient) { }

    public getResortsByTourismId(tourismId: string | null): Observable<ResortResponse> {
        tourismId = tourismId ? tourismId : '';
        const url = `${this.apiTourismUrl}/${tourismId}/resorts`;

        return this.http.get<ResortResponse>(url);
    }
}
