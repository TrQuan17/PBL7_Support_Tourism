import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { CategoryResponse, TourismResponse } from 'src/app/common/models';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnChanges{
    @Input() tourismResponse!: TourismResponse;
    @Input() categoryResponse!: CategoryResponse;

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue)
        }

        if(changes?.['categoryResponse']?.currentValue) {
            this.categoryResponse = clone(changes?.['categoryResponse'].currentValue)
        }
    }
}
