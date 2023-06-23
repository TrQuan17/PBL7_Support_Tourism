import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ResortResponse, ReviewModel, ReviewResponse, ServiceResponse, SnackBarPanelClass } from 'src/app/common/models';
import { ResortService, ReviewService, ServiceService } from 'src/app/common/services';

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
    public reviewsResort!: ReviewResponse;
    public resortId = '';

    constructor(
        public snackbar: MatSnackBar,
        private router: ActivatedRoute,
        private resortService: ResortService,
        private serviceService: ServiceService,
        private reviewService: ReviewService
    ) {
        this.resortId = this.router.snapshot.paramMap.get('resortId') as string;
    }

    ngOnInit(): void {
        this.getResortDetail();
        this.getServicesResort();
        this.getReviewsResort();
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

    public getReviewsResort(): void {
        this.reviewService.getReviewsByResort(this.resortId).subscribe(
            (res: ReviewResponse) => {
                this.reviewsResort = res;
            }
        )
    }

    public reviewClassify(review: ReviewModel) {
        const data = {
            id: review._id,
            text: review.text
        }

        this.reviewService.reviewClassify(data).subscribe();
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
                    this.getReviewsResort();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }
}
