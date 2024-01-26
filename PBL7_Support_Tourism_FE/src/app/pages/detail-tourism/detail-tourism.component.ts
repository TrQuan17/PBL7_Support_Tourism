import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FavouriteModel, FavouriteResponse, RateNumResponse, ResortResponse, ReviewModel, ReviewResponse, SnackBarPanelClass, TourismResponse } from 'src/app/common/models';
import { FavouriteService, ResortService, ReviewService, TourismService } from 'src/app/common/services';
import { ReviewStatisticsService } from 'src/app/common/services/review-statistics.service';

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
    public tourismId = '';
    public tourismResponse!: TourismResponse;
    public resortsTourism!: ResortResponse;
    public reviewsTourism!: ReviewResponse;
    public rateNumResponse!: RateNumResponse;
    public isReview = false;
    public currentReviewPage = 1;

    constructor(
        public snackbar: MatSnackBar,
        private router: ActivatedRoute,
        private tourismService: TourismService,
        private resortService: ResortService,
        private reviewService: ReviewService,
        private favouriteService: FavouriteService,
        private reviewStatisticsService: ReviewStatisticsService
    ) {
        this.tourismId = this.router.snapshot.paramMap.get('tourismId') as string;

    }

    public ngOnInit(): void {
        this.getTourismDetail();
        this.getResortsTourism();
        this.checkAccountReview();
        this.setAvgReviewPercent(this.tourismId);
        this.updateRate(this.tourismId);
    }

    public getTourismDetail(): void {
        this.tourismService.getTourismById(this.tourismId).subscribe(
            (res: TourismResponse) => {
                this.tourismResponse = res;
            }
        )
    }

    public getRateNumTourism(): void {
        this.reviewService.getRateNumByTourism(this.tourismId).subscribe(
            (res: RateNumResponse) => {
                this.rateNumResponse = res;
            }
        )
    }

    public getReviewsTourism(): void {
        this.reviewService.getReviewsByTourism(this.tourismId, this.currentReviewPage).subscribe(
            (res: ReviewResponse) => {
                this.reviewsTourism = res;
            }
        ) 
    }

    public getResortsTourism(): void {
        this.resortService.getResortsByTourism(this.tourismId).subscribe(
            (res: ResortResponse) => {
                this.resortsTourism = res;
            }
        )
    }

    public checkAccountReview(): void {
        this.reviewService.checkAccountReviewTourism(this.tourismId).subscribe(
            (res: ReviewResponse) => {
                this.isReview = res.status === 'FAILED';
            }
        )
    }

    public setAvgReviewPercent(tourismId: string): void {
        this.reviewStatisticsService.setAvgPositivePercentTourism(tourismId).subscribe();
    }

    public updateRate(tourismId: string): void {
        this.reviewService.updateRateTourism(tourismId).subscribe(
            (res: ReviewResponse) => {
                if(res.status === 'SUCCESS') {
                    this.getTourismDetail();
                    this.getRateNumTourism();
                    this.getReviewsTourism();
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
                    this.setAvgReviewPercent(this.tourismId);
                }
            }
        );
    }

    public writeReview(data: FormData): void {
        this.reviewService.createWithTourism(data).subscribe(
            (res: ReviewResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể bình luận cho địa điểm này!';

                if(res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.reviewClassify(res.data as ReviewModel);
                    this.updateRate(this.tourismId);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveFavourite(favourite: FavouriteModel): void {
        this.favouriteService.createFavourite(favourite).subscribe(
            (res: FavouriteResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể lưu địa điểm này!';

                if(res.status === 'SUCCESS') {
                    message = 'Đã thêm vào danh mục yêu thích!';
                    snackBarPanel = SnackBarPanelClass.successClass;
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public goPageReview(page: number): void {
        this.currentReviewPage = page;
        this.getReviewsTourism();
    }
}
