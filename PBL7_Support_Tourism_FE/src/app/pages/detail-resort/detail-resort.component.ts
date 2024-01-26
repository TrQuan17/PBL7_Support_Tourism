import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RateNumResponse, ResortResponse, ReviewModel, ReviewResponse, ServiceResponse, SnackBarPanelClass } from 'src/app/common/models';
import { RoomResponse } from 'src/app/common/models/room.model';
import { ResortService, ReviewService, ServiceService } from 'src/app/common/services';
import { ReviewStatisticsService } from 'src/app/common/services/review-statistics.service';
import { RoomService } from 'src/app/common/services/room.service';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
  selector: 'app-detail-resort',
  templateUrl: './detail-resort.component.html',
  styleUrls: ['./detail-resort.component.scss']
})
export class DetailResortComponent implements OnInit {
    public resortResponse!: ResortResponse;
    public servicesResort!: ServiceResponse;
    public roomsResort!: RoomResponse;
    public reviewsResort!: ReviewResponse;
    public rateNumResponse!: RateNumResponse;
    public isReview = false;
    public resortId = '';
    public currentReviewPage = 1;

    constructor(
        public snackbar: MatSnackBar,
        private router: ActivatedRoute,
        private resortService: ResortService,
        private serviceService: ServiceService,
        private roomService: RoomService,
        private reviewService: ReviewService,
        private reviewStatisticsService: ReviewStatisticsService
    ) {
        this.resortId = this.router.snapshot.paramMap.get('resortId') as string;
    }

    ngOnInit(): void {
        this.getResortDetail();
        this.getServicesResort();
        this.getRoomsResort();
        this.checkAccountReview();
        this.getRateNumResort();
        this.setAvgReviewPercent(this.resortId);
        this.updateRate(this.resortId);
    }

    public getResortDetail(): void {
        this.resortService.getResortById(this.resortId).subscribe(
            (res: ResortResponse) => {
                this.resortResponse = res;
            }
        )
    }

    public getServicesResort(): void {
        this.serviceService.getServicesByResort(this.resortId).subscribe(
            (res: ServiceResponse) => {
                this.servicesResort = res;
            }
        )
    }

    public getRoomsResort(): void {
        this.roomService.getRoomsByResort(this.resortId).subscribe(
            (res: RoomResponse) => {
                this.roomsResort = res;
            }
        )
    }

    public getRateNumResort(): void {
        this.reviewService.getRateNumByResort(this.resortId).subscribe(
            (res: RateNumResponse) => {
                this.rateNumResponse = res;
            }
        )
    }

    public getReviewsResort(): void {
        this.reviewService.getReviewsByResort(this.resortId, this.currentReviewPage).subscribe(
            (res: ReviewResponse) => {
                this.reviewsResort = res;
            }
        )
    }

    public checkAccountReview(): void {
        this.reviewService.checkAccountReviewResort(this.resortId).subscribe(
            (res: ReviewResponse) => {
                this.isReview = res.status === 'FAILED';
            }
        )
    }

    public setAvgReviewPercent(resortId: string): void {
        this.reviewStatisticsService.setAvgPositivePercentResort(resortId).subscribe()
    }

    public updateRate(resortId: string): void {
        this.reviewService.updateRateResort(resortId).subscribe(
            (res: ReviewResponse) => {
                if(res.status === 'SUCCESS') {
                    this.getRateNumResort();
                    this.getReviewsResort();
                    this.getRateNumResort();
                }
            }
        );
    }

    public reviewClassify(review: ReviewModel) {
        const data = {
            id: review._id,
            text: review.text
        }

        this.reviewService.reviewClassify(data).subscribe(
            (res: ReviewResponse) => {
                if(res.status === 'SUCCESS') {
                    this.setAvgReviewPercent(this.resortId);
                }
            }
        );
    }

    public writeReview(data: FormData): void {
        this.reviewService.createWithResort(data).subscribe(
            (res: ReviewResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể bình luận cho địa điểm này!';

                if(res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.reviewClassify(res.data as ReviewModel);
                    this.updateRate(this.resortId);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public goPageReview(page: number): void {
        this.currentReviewPage = page;
        this.getReviewsResort();
    }
}
