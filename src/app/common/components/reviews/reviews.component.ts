/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RateNumModel, RateNumResponse, ResortModel, ResortResponse, ReviewModel, ReviewResponse, TourismModel, TourismResponse } from '../../models';
import { Utils } from '../../utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { clone } from 'lodash';
import { RequiresLoginDialogComponent } from '../requires-login-dialog/requires-login-dialog.component';
import { WriteReviewDialogComponent } from '../write-review-dialog/write-review-dialog.component';

@Component({
    selector: 'app-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnChanges {
    @Input() reviewResponse!: ReviewResponse;
    @Input() rateNumResponse!: RateNumResponse;
    @Input() tourismResponse?: TourismResponse;
    @Input() resortResponse?: ResortResponse;
    @Input() isReview = false;
    @Input() currentPage = 1;
    @Output() pageEmitter = new EventEmitter<number>;
    @Output() reviewEmitter = new EventEmitter<FormData>;


    public tourism?: TourismModel;
    public resort?: ResortModel;
    public reviewsList: any[] = [];
    public utils = Utils;
    public ratesNum: RateNumModel;

    constructor(public dialog: MatDialog) {
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
            if (this.reviewResponse.status === 'SUCCESS') {
                this.reviewsList = this.reviewResponse.data as ReviewModel[];
            }
        }

        if (changes?.['rateNumResponse']?.currentValue) {
            this.rateNumResponse = clone(changes?.['rateNumResponse'].currentValue);
            if (this.rateNumResponse.status === 'SUCCESS') {
                this.ratesNum = this.rateNumResponse.data as RateNumModel;
            }
        }

        if (changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue);

            if (this.tourismResponse?.status === 'SUCCESS') {
                this.tourism = this.tourismResponse.data as TourismModel;
            }
        }

        if (changes?.['resortResponse']?.currentValue) {
            this.resortResponse = clone(changes?.['resortResponse'].currentValue);

            if (this.resortResponse?.status === 'SUCCESS') {
                this.resort = this.resortResponse.data as ResortModel;
            }
        }
    }

    public openWriteReview(): void {
        if (!Utils.isCurrentAccount()) {
            this.dialog.open(RequiresLoginDialogComponent, {
                height: '500px',
                width: '410px',
                data: 'Đăng nhập để tiếp tục để lại đánh giá của bạn.'
            })
            return;
        }

        let dialogData;

        if (this.tourismResponse) {
            dialogData = { field: 'tourism', data: this.tourism }
        }

        if (this.resortResponse) {
            dialogData = { field: 'resort', data: this.resort }
        }

        const diaogRef = this.dialog.open(WriteReviewDialogComponent, {
            height: '90%',
            data: dialogData,
            disableClose: true,
            autoFocus: false
        })

        diaogRef.afterClosed().subscribe(data => {
            if (data) {
                this.reviewEmitter.emit(data);
            }
        })
    }

    public goPageReview(page: number): void {
        this.pageEmitter.emit(page);
    }
}
