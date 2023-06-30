import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';
import { TripModel, TripResponse } from '../models/trip.model';
import { Observable, finalize } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    public apiTripUrl = ApiPath.TRIP;
    public apiAuthTripUrl = ApiPath.AUTH_TRIPS;

    constructor(
        private http: HttpClient,
        private loadingDialog: LoadingSpinnerDialogService
    ) { }

    public getAuthTrips(): Observable<TripResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<TripResponse>(this.apiAuthTripUrl).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public getTripById(tripId: string): Observable<TripResponse> {
        this.loadingDialog.showSpinner(true);

        const url = `${this.apiTripUrl}/${tripId}`;
        return this.http.get<TripResponse>(url).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public createTrip(trip: FormData): Observable<TripResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<TripResponse>(this.apiTripUrl, trip).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public deleteTrip(trip: TripModel): Observable<TripResponse> {
        this.loadingDialog.showSpinner(true);

        const httpOptions = {
            header: new Headers({
                'Content-Type': 'application/json'
            }),
            body: trip
        }
        
        return this.http.delete<TripResponse>(this.apiTripUrl, httpOptions).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
