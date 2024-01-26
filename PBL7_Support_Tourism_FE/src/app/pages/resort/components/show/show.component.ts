/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { clone } from 'lodash';
import { ResortModel, ResortResponse, SnackBarPanelClass } from 'src/app/common/models';

const SNACK_BAR_CONFIG = new MatSnackBarConfig()
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnChanges {
    @Input() resortResponse!: ResortResponse;
    @Input() searchResort = '';

    public resortsList: any[] = [];

    constructor(
        public snackbar: MatSnackBar,
        private clipboard: Clipboard
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['resortResponse']?.currentValue) {
            this.resortResponse = clone(changes?.['resortResponse'].currentValue)
            this.resortsList = this.resortResponse.data as ResortModel[];
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
