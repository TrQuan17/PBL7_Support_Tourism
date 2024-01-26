import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { RoomModel, RoomResponse } from 'src/app/common/models/room.model';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnChanges {
    @Input() roomResponse!: RoomResponse;

    public roomsList: RoomModel[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['roomResponse']?.currentValue) {
            this.roomResponse = clone(changes?.['roomResponse'].currentValue);
            if(this.roomResponse.status === 'SUCCESS') {
                this.roomsList = this.roomResponse.data as RoomModel[];
            }
        }
    }
}
