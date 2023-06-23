import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { ServiceModel, ServiceResponse } from 'src/app/common/models';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnChanges {
    @Input() serviceResponse!: ServiceResponse;

    public servicesList: ServiceModel[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['serviceResponse']?.currentValue) {
            this.serviceResponse = clone(changes?.['serviceResponse'].currentValue);
            if(this.serviceResponse.status === 'SUCCESS') {
                this.servicesList = this.serviceResponse.data as ServiceModel[];
            }
        }
    }
}
