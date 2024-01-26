/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTripDialogComponent } from '../create-trip-dialog/create-trip-dialog.component';
import { ConfirmDialogConfig, FavouriteModel, FavouriteResponse, TourismModel } from 'src/app/common/models';
import { clone } from 'lodash';
import { TripModel, TripResponse } from 'src/app/common/models/trip.model';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnChanges {
    @Input() tripResponse!: TripResponse;
    @Input() favouriteResponse!: FavouriteResponse; 
    @Output() createTripEmitter = new EventEmitter<FormData>;
    @Output() deleteTripEmitter = new EventEmitter<TripModel>;

    public tripsList: any[] = [];
    public favouritesList: any[] = [];

    constructor(
        public dialog: MatDialog
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['favouriteResponse']?.currentValue) {
            this.favouriteResponse = clone(changes?.['favouriteResponse']?.currentValue);
            if (this.favouriteResponse.status === 'SUCCESS') {
                this.favouritesList = this.favouriteResponse.data as FavouriteModel[];

                this.favouritesList = this.favouritesList.map(value => {
                    value.tourism = value.tourism as TourismModel;
                    return value;
                })
            }
        }

        if (changes?.['tripResponse']?.currentValue) {
            this.tripResponse = clone(changes?.['tripResponse']?.currentValue);
            if (this.tripResponse.status === 'SUCCESS') {
                this.tripsList = this.tripResponse.data as TripModel[];
            }
        }
    }

    public openCreateTripDialog(): void {
        const dialogRef = this.dialog.open(CreateTripDialogComponent, {
            width: '80vw',
            height: '80vh',
            data: this.favouritesList
        });

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.createTripEmitter.emit(data);
            }
        });
    }

    public deleteTrip(trip: TripModel): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'delete-dialog',
            header: 'Xác nhận xóa chuyến đi',
            message: `Bạn xác nhận xóa chuyến đi ${trip.name} ?`,
            image: trip.background
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(confirm => {
            if(confirm) {
                this.deleteTripEmitter.emit(trip);
            }
        })
    }
}
