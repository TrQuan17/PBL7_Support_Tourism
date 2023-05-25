/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { AccountModel, ReviewModel, ReviewResponse } from 'src/app/common/models';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnChanges {
    @Input() reviewResponse!: ReviewResponse;

    public reviewsList: any[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['reviewResponse']?.currentValue) {
            this.reviewResponse = clone(changes?.['reviewResponse'].currentValue);
            this.reviewsList = this.reviewResponse.data as ReviewModel[];
            
            this.reviewsList = (this.reviewResponse.data as ReviewModel[]).map(review => {
                review.account = review.account as AccountModel;
                return review;
            })
        }
    }
}
