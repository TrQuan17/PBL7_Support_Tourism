/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { FavouriteModel, FavouriteResponse, TourismModel } from 'src/app/common/models';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnChanges {
    @Input() favouriteResponse!: FavouriteResponse;
    @Output() deleteEmitter = new EventEmitter<FavouriteModel>;

    public favouritesList: any[] = [];

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
    }

    public deleteFavourite(favourite: FavouriteModel): void {
        this.deleteEmitter.emit(favourite);
    }
}
