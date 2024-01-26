import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { clone } from 'lodash';
import { ResortModel, ResortResponse, SnackBarPanelClass } from 'src/app/common/models';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

interface StatusRoom {
    class: string,
    status: string
}

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnChanges {
    @Input() resortResponse!: ResortResponse;
    public resort?: ResortModel;
    public statusRoom?: StatusRoom;
    public selectedImg = '';

    constructor(
        public snackbar: MatSnackBar,
        public dialog: MatDialog,
        private clipboard: Clipboard
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['resortResponse']?.currentValue) {
            this.resortResponse = clone(changes?.['resortResponse'].currentValue);
            if(this.resortResponse.status === 'SUCCESS') {
                this.resort = this.resortResponse.data as ResortModel;
                this.getStatusRoom(this.resort);
            }
        }
    }

    public getStatusRoom(resort: ResortModel) {
        let bookNum =  resort.reservationsNum;
        bookNum = bookNum ? bookNum : 0;
        
        const limit = resort.reservationLimit;

        if(!limit) {
            this.statusRoom = { class: 'full', status: 'Hết phòng' };
        }
        else {
            const percent = bookNum / limit;
            if(percent <= 0.5) this.statusRoom = {class: 'empty', status: 'Trống trải'};
            else if(percent < 1) this.statusRoom = { class: 'hot', status: 'Đông đúc' };
            else this.statusRoom = { class: 'full', status: 'Hết phòng' };
        }
    }

    public copyLink(): void {
        this.clipboard.copy(window.location.href);

        const message = 'Đã sao chép đương dẫn!';
        const panelClass = SnackBarPanelClass.successClass;

        SNACK_BAR_CONFIG.panelClass = panelClass;
        this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
    }
}
