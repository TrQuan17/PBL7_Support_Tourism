/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { ReviewStatisticsModel, ReviewStatisticsResponse } from 'src/app/common/models/reviewStatistics.model';

@Component({
    selector: 'app-recommend',
    templateUrl: './recommend.component.html',
    styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnChanges {
    @Input() tourismsRecommendRes!: ReviewStatisticsResponse;
    @Input() resortRecommendRes!: ReviewStatisticsResponse;

    public tourismsList: any[] = [];
    public resortsList: any[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['tourismsRecommendRes']?.currentValue) {
            this.tourismsRecommendRes = clone(changes?.['tourismsRecommendRes'].currentValue);
            this.tourismsList = this.tourismsRecommendRes?.data as ReviewStatisticsModel[];
        }

        if (changes?.['resortRecommendRes']?.currentValue) {
            this.resortRecommendRes = clone(changes?.['resortRecommendRes'].currentValue);
            this.resortsList = this.resortRecommendRes?.data as ReviewStatisticsModel[];
        }
    }
}
