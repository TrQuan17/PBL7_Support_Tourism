import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { clone } from 'lodash';
import { SnackBarPanelClass, TourismModel, TourismResponse } from 'src/app/common/models';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';


@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnChanges {
    @Input() tourismResponse!: TourismResponse;
    public tourism?: TourismModel;

    constructor(
        public snackbar: MatSnackBar,
        private clipboard: Clipboard
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue);
            this.tourism = this.tourismResponse.data as TourismModel;
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
