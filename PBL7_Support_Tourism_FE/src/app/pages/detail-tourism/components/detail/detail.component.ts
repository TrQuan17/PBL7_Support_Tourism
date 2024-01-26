import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { clone } from 'lodash';
import { FavouriteModel, SnackBarPanelClass, TourismModel, TourismResponse } from 'src/app/common/models';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Utils } from 'src/app/common/utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { RequiresLoginDialogComponent } from 'src/app/common/components/requires-login-dialog/requires-login-dialog.component';

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
    @Output() favouriteEmitter = new EventEmitter<FavouriteModel>;
    public tourism?: TourismModel;
    public selectedImg = '';


    constructor(
        public snackbar: MatSnackBar,
        public dialog: MatDialog,
        private clipboard: Clipboard
    ) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue);
            if(this.tourismResponse.status === 'SUCCESS') {
                this.tourism = this.tourismResponse.data as TourismModel;
            }  
        }
    }

    public saveFavourite(): void {
        if (!Utils.isCurrentAccount()) {
            this.dialog.open(RequiresLoginDialogComponent, {
                height: '500px',
                width: '410px',
                data: 'Đăng nhập để tiếp tục để lại đánh giá của bạn.'
            });
            return;
        }
        
        const favourite: FavouriteModel = {
            tourism: this.tourism?._id as string
        };

        this.favouriteEmitter.emit(favourite);
    }

    public copyLink(): void {
        this.clipboard.copy(window.location.href);

        const message = 'Đã sao chép đương dẫn!';
        const panelClass = SnackBarPanelClass.successClass;

        SNACK_BAR_CONFIG.panelClass = panelClass;
        this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
    }
}
