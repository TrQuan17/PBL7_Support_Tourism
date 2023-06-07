import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AccountModel, AccountResponse } from '../../models';
import { clone } from 'lodash';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {
    @Input() authResponse?: AccountResponse;
    @Input() guestResponse?: AccountResponse;
    @Input() postResponse!: string;

    public account?: AccountModel;

    ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['authResponse']?.currentValue) {
            this.authResponse = clone(changes?.['authResponse'].currentValue);
            if(this.authResponse?.status === 'SUCCESS') {
                this.account = this.authResponse?.data as AccountModel;
            }
        }

        if(changes?.['guestResponse']?.currentValue) {
            this.guestResponse = clone(changes?.['guestResponse'].currentValue);
            if(this.guestResponse?.status === 'SUCCESS') {
                this.account = this.guestResponse?.data as AccountModel;
            }
        }
    }
}
