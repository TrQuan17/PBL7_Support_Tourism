import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { ResortModel, ResortResponse } from 'src/app/common/models';

@Component({
    selector: 'app-resorts',
    templateUrl: './resorts.component.html',
    styleUrls: ['./resorts.component.scss']
})
export class ResortsComponent implements OnChanges {
    @Input() resortResponse!: ResortResponse;
    public resortsList: ResortModel[] = []; 

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['resortResponse']?.currentValue) {
            this.resortResponse = clone(changes?.['resortResponse'].currentValue)
            this.resortsList = this.resortResponse.data as ResortModel[];
        }
    }

}
