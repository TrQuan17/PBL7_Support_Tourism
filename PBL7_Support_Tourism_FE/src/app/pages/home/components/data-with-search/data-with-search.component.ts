import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { ResortModel, ResortResponse, TourismModel, TourismResponse } from 'src/app/common/models';

@Component({
    selector: 'app-data-with-search',
    templateUrl: './data-with-search.component.html',
    styleUrls: ['./data-with-search.component.scss']
})
export class DataWithSearchComponent implements OnChanges {
    @Input() typeSearch = '';
    @Input() keyWord = '';
    @Input() tourismResponse?: TourismResponse;
    @Input() resortResponse?: ResortResponse; 
    @Output() resetEmiiter = new EventEmitter<void>;

    public tourismsList: TourismModel[] = [];
    public resortsList: ResortModel[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue);
            if(this.tourismResponse?.status === 'SUCCESS') {
                this.tourismsList = this.tourismResponse.data as TourismModel[];
            }
        }

        if(changes?.['resortResponse']?.currentValue) {
            this.resortResponse = clone(changes?.['resortResponse'].currentValue);
            if(this.resortResponse?.status === 'SUCCESS') {
                this.resortsList = this.resortResponse.data as ResortModel[];
            }
        }
    }

    public reset(): void {
        this.resetEmiiter.emit();
    }
}
