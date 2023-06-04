import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { ResortModel, ResortResponse, TourismModel, TourismResponse } from 'src/app/common/models';

@Component({
    selector: 'app-recommend',
    templateUrl: './recommend.component.html',
    styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnChanges {
    @Input() tourismsRecommendRes!: TourismResponse;
    @Input() resortRecommendRes!: ResortResponse;

    public tourismsList: TourismModel[] = [];
    public resortsList: ResortModel[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['tourismsRecommendRes']?.currentValue) {
            this.tourismsRecommendRes = clone(changes?.['tourismsRecommendRes'].currentValue);
            this.tourismsList = this.tourismsRecommendRes?.data as TourismModel[];
        }

        if (changes?.['resortRecommendRes']?.currentValue) {
            this.resortRecommendRes = clone(changes?.['resortRecommendRes'].currentValue);
            this.resortsList = this.resortRecommendRes?.data as ResortModel[];
        }
    }
}
