import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ResortResponse, ReviewResponse, TourismResponse } from 'src/app/common/models';
import { ResortService, ReviewService, TourismService } from 'src/app/common/services';

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
        private reviewService: ReviewService,
        private resortService: ResortService
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
}
