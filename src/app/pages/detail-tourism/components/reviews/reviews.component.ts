/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { clone } from 'lodash';
import { AccountModel, ReviewModel, ReviewResponse, TourismModel, TourismResponse } from 'src/app/common/models';
import { WriteReviewDialogComponent } from '../write-review-dialog/write-review-dialog.component';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnChanges {
    @Input() reviewResponse!: ReviewResponse;
    @Input() tourismResponse!: TourismResponse;

    public tourism?: TourismModel;
    public reviewsList: any[] = [];

    constructor( public dialog: MatDialog ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['reviewResponse']?.currentValue) {
            this.reviewResponse = clone(changes?.['reviewResponse'].currentValue);
            this.reviewsList = this.reviewResponse.data as ReviewModel[];
            
            this.reviewsList = (this.reviewResponse.data as ReviewModel[]).map(review => {
                review.account = review.account as AccountModel;
                return review;
            })
        }

        if(changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue);
            this.tourism = this.tourismResponse.data as TourismModel;
        }
    }

    public openWriteReview(): void {
        const diaogRef = this.dialog.open(WriteReviewDialogComponent, {
            height: '90%',
            data: this.tourism,
            disableClose: true,
            autoFocus: false
        })

        diaogRef.afterClosed().subscribe(data => {
            if(data) {
                console.log(data);
            }
        })
    }
}
