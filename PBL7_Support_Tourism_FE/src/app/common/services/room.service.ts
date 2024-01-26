import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiPath } from 'src/app/core/config';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';
import { RoomModel, RoomResponse } from '../models/room.model';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    public apiRoomUrl = ApiPath.ROOM;
    public apiResortUrl = ApiPath.RESORT;

    constructor(
        private http: HttpClient,
        private loadingDialog: LoadingSpinnerDialogService
    ) { }

    public getRoomsByResort(resortId: string): Observable<RoomResponse> {
        const url = `${this.apiResortUrl}/${resortId}/rooms`;
        return this.http.get<RoomResponse>(url);
    }

    public createRoom(room: FormData): Observable<RoomResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.post<RoomResponse>(this.apiRoomUrl, room).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    } 

    public updateRoom(room: FormData): Observable<RoomResponse> {
        this.loadingDialog.showSpinner(true);

        return this.http.put<RoomResponse>(this.apiRoomUrl, room).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    }

    public deleteRoom(room: RoomModel): Observable<RoomResponse> {
        this.loadingDialog.showSpinner(true);

        const httpOptions = {
            header: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: room
        }

        return this.http.delete<RoomResponse>(this.apiRoomUrl, httpOptions).pipe(
            finalize(() => this.loadingDialog.showSpinner(false))
        );
    } 
}
