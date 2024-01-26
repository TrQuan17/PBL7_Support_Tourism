import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { ServiceModel, ServiceResponse } from '../models';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    public apiServiceUrl = ApiPath.SERVICE;
    public apiServiceByAccountUrl = ApiPath.SERVICE_BY_ACCOUNT;
    public apiResortUrl = ApiPath.RESORT;

    constructor(
        private http: HttpClient,
        private loadingDialog: LoadingSpinnerDialogService
    ) { }

    public getServicesAndSearch(): Observable<ServiceResponse> {
        return this.http.get<ServiceResponse>(this.apiServiceUrl);
    }

    public getServicesByResort(resortId: string): Observable<ServiceResponse> {
        const url = `${this.apiResortUrl}/${resortId}/services`;
        return this.http.get<ServiceResponse>(url);
    }

    public getServicesByAccount(): Observable<ServiceResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.get<ServiceResponse>(this.apiServiceByAccountUrl).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public createService(service: FormData): Observable<ServiceResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<ServiceResponse>(this.apiServiceUrl, service).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public updateService(service: FormData): Observable<ServiceResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.put<ServiceResponse>(this.apiServiceUrl, service).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public deleteService(service: ServiceModel): Observable<ServiceResponse> {
        this.loadingDialog.showSpinner(true);

        const httpOptions = {
            header: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: service
        }

        return this.http.delete<ServiceResponse>(this.apiServiceUrl, httpOptions).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }
}
