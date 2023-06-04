/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { clone } from 'lodash';
import { AccountModel, RatesNumModel, ReviewModel, ReviewResponse, TourismModel, TourismResponse } from 'src/app/common/models';
import { WriteReviewDialogComponent } from '../write-review-dialog/write-review-dialog.component';
import { FormGroup } from '@angular/forms';
import { Utils } from 'src/app/common/utils/utils';
import { RequiresLoginDialogComponent } from 'src/app/common/components/requires-login-dialog/requires-login-dialog.component';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnChanges {
    @Input() reviewResponse!: ReviewResponse;
    @Input() tourismResponse!: TourismResponse;
    @Output() reviewEmitter = new EventEmitter<FormGroup>;

    public tourism?: TourismModel;
    public reviewsList: any[] = [];
    public utils = Utils;
    public ratesNum: RatesNumModel;

    constructor( public dialog: MatDialog ) {
        this.ratesNum = {
            excellent: 0,
            veryGood: 0,
            average: 0,
            unsatisfactory: 0,
            terrible: 0
        }
     }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['reviewResponse']?.currentValue) {
            this.reviewResponse = clone(changes?.['reviewResponse'].currentValue);
            this.reviewsList = this.reviewResponse.data as ReviewModel[];
            
            this.reviewsList = (this.reviewResponse.data as ReviewModel[]).map(review => {
                review.account = review.account as AccountModel;
                return review;
            })

            this.getNumRateByStar();
        }

        if(changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue);
            this.tourism = this.tourismResponse.data as TourismModel;
        }
    }

    public getNumRateByStar(): void {
        this.ratesNum = {
            excellent: this.reviewsList.filter(review => review.vote === 5).length,
            veryGood: this.reviewsList.filter(review => review.vote === 4).length,
            average: this.reviewsList.filter(review => review.vote === 3).length,
            unsatisfactory: this.reviewsList.filter(review => review.vote === 2).length,
            terrible: this.reviewsList.filter(review => review.vote === 1).length
        }
    }

    public openWriteReview(): void {
        if(!Utils.isCurrentAccount()) {
            this.dialog.open(RequiresLoginDialogComponent, {
                height: '500px',
                width: '410px',
                data: 'Đăng nhập để tiếp tục để lại đánh giá của bạn.'
            })
            return;
        }

        const diaogRef = this.dialog.open(WriteReviewDialogComponent, {
            height: '90%',
            data: this.tourism,
            disableClose: true,
            autoFocus: false
        })

        diaogRef.afterClosed().subscribe(data => {
            if(data) {
                this.reviewEmitter.emit(data);
            }
        })
    }
}
