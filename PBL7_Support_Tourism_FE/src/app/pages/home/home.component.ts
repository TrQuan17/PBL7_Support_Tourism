import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResortResponse, TourismResponse } from 'src/app/common/models';
import { ReviewStatisticsResponse } from 'src/app/common/models/reviewStatistics.model';
import { ResortService, TourismService } from 'src/app/common/services';
import { ReviewStatisticsService } from 'src/app/common/services/review-statistics.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public tourismsRecommend!: ReviewStatisticsResponse;
    public resortsRecommend!: ReviewStatisticsResponse;
    public tourismSearch?: TourismResponse;
    public resortSearch?: ResortResponse;
    public isResetSearch = false;
    public typeSearch = '';
    public keyWord = '';

    constructor(
        private reviewStatisticsService: ReviewStatisticsService,
        private tourismService: TourismService,
        private resortService: ResortService
    ) {
        this.getTourismsRecommend();
        this.getResortsRecommend();
    }

    public getTourismsRecommend(): void {
        this.reviewStatisticsService.getTourismReviewTop().subscribe(
            (res: ReviewStatisticsResponse) => {
                this.tourismsRecommend = res;
            }
        )
    }

    public getResortsRecommend(): void {
        this.reviewStatisticsService.getResortReviewTop().subscribe(
            (res: ReviewStatisticsResponse) => {
                this.resortsRecommend = res;
            }
        )
    }

    public searchData(form: FormGroup): void {
        this.typeSearch = form.get('type')?.value;
        this.keyWord = form.get('text')?.value;

        switch(this.typeSearch) {
            case 'tourism':
                this.getTourismSearch(this.keyWord);
                this.typeSearch = 'Địa điểm du lịch';
                break;
            case 'resort':
                this.getResortSearch(this.keyWord);
                this.typeSearch = 'Khu nghỉ dưỡng';
                break;
        }
    }

    public getTourismSearch(q: string): void {
        this.tourismService.getTourismsAndSearch(q, 1, 0).subscribe(
            (res: TourismResponse) => {
                if(res.status === 'SUCCESS') {
                    this.tourismSearch = res;
                }
            }
        )
    }

    public getResortSearch(q: string): void {
        this.resortService.getResortsAndSearch(q, 1, 0).subscribe(
            (res: ResortResponse) => {
                if(res.status === 'SUCCESS') {
                    this.resortSearch = res;
                }
            }
        )
    }

    public resetSearch(): void {
       this.keyWord = '';
       this.isResetSearch = true;
    }
}
