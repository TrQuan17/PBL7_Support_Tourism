import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FavouriteModel, FavouriteResponse, SnackBarPanelClass } from 'src/app/common/models';
import { TripModel, TripResponse } from 'src/app/common/models/trip.model';
import { FavouriteService } from 'src/app/common/services';
import { TripService } from 'src/app/common/services/trip.service';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

enum Menu {
    FAVOURITES = 'favourites',
    TRIPS = 'trips'
}

@Component({
    selector: 'app-favourite',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
    public favouriteResponse!: FavouriteResponse;
    public tripResponse!: TripResponse;
    public menu = Menu;
    public menuSelected = Menu.FAVOURITES;

    constructor(
        public snackbar: MatSnackBar,
        private favouriteService: FavouriteService,
        private tripService: TripService
    ) { }

    ngOnInit(): void {
        this.getFavourites();
        this.getTrips();
    }

    public getFavourites(): void {
        this.favouriteService.getAuthFavourite().subscribe(
            (res: FavouriteResponse) => {
                this.favouriteResponse = res;
            }
        )
    }

    public deleteFavourite(favourite: FavouriteModel): void {
        this.favouriteService.deleteFavourite(favourite).subscribe(
            () => {
                this.getFavourites();
            }
        );
    }

    public getTrips(): void {
        this.tripService.getAuthTrips().subscribe(
            (res: TripResponse) => {
                this.tripResponse = res;
            }
        )
    }

    public createTrip(form: FormData): void {
        this.tripService.createTrip(form).subscribe(
            (res: TripResponse) => {
                let message = 'Tạo chuyến đi không thành công';
                let snackBarPanel = SnackBarPanelClass.errorClass;

                if(res.status === 'SUCCESS') {
                    message = 'Tạo chuyến đi thành công';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getTrips();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public deleteTrip(trip: TripModel): void {
        this.tripService.deleteTrip(trip).subscribe(
            (res: TripResponse) => {
                let message = 'Xóa chuyến đi không thành công';
                let snackBarPanel = SnackBarPanelClass.errorClass;

                if(res.status === 'SUCCESS') {
                    message = 'Xóa chuyến đi thành công';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getTrips();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public selectMenu(type: Menu): void {
        this.menuSelected = type;
    }

    public getMenuSelected(selected: Menu): string {
        return selected === this.menuSelected ? 'selected' : 'no-select';
    }
}
