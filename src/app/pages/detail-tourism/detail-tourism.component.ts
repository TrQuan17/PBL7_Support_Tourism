import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {  ResortResponse, ReviewModel, ReviewResponse, SnackBarPanelClass, TourismResponse } from 'src/app/common/models';
import { ResortService, ReviewService, TourismService } from 'src/app/common/services';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-detail-tourism',
    templateUrl: './detail-tourism.component.html',
    styleUrls: ['./detail-tourism.component.scss']
})
export class DetailTourismComponent implements OnInit {
    public tourismId: string | null;
    public tourism!: TourismResponse;
    public resortsTourism!: ResortResponse;
    public reviewsTourism!: ReviewResponse;

    constructor(
        private router: ActivatedRoute,
        private tourismService: TourismService,
        private resortService: ResortService,
        private reviewService: ReviewService,
        public snackbar: MatSnackBar
    ) {
        this.tourismId = this.router.snapshot.paramMap.get('tourismId');
    }

    public ngOnInit(): void {
        this.getTourismDetail();
        this.getReviewsTourism();
        this.getResortsTourism();
    }

    public getTourismDetail(): void {
        this.tourismService.getTourismById(this.tourismId ? this.tourismId : '').subscribe(
            (res: TourismResponse) => {
                this.tourism = res;
            }
        )
    }

    public getReviewsTourism(): void {
        this.reviewService.getReviewsByTourismId(this.tourismId).subscribe(
            (res: ReviewResponse) => {
                this.reviewsTourism = res;
            }
        ) 
    }

    public getResortsTourism(): void {
        this.resortService.getResortsByTourismId(this.tourismId).subscribe(
            (res: ResortResponse) => {
                this.resortsTourism = res;
            }
        )
    }

    public writeReview(data: FormGroup): void {
        const review: ReviewModel = {
            vote: data.get('vote')?.value,
            title: data.get('title')?.value,
            text:  data.get('text')?.value,
            images: [],
            time:  data.get('time')?.value,
            tourism:  data.get('tourism')?.value
        }

        this.reviewService.createWithTourism(review).subscribe(
            (res: ReviewResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể bình luận cho địa điểm này!';

                if(res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getReviewsTourism();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
        console.log(data);
    }
}
