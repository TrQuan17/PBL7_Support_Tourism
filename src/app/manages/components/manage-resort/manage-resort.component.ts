import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ResortModel, ResortResponse, SnackBarPanelClass } from 'src/app/common/models';
import { ResortService } from 'src/app/common/services';
import { ManageResortDialogComponent } from '../manage-resort-dialog/manage-resort-dialog.component';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-manage-resort',
    templateUrl: './manage-resort.component.html',
    styleUrls: ['./manage-resort.component.scss']
})
export class ManageResortComponent implements OnInit {
    public displayedColumns: string[] = ['images', 'name', 'action'];
    public dataSource = new MatTableDataSource<ResortModel>;

    constructor(
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private resortService: ResortService
    ) { }

    ngOnInit(): void {
        this.getResorts();
    }

    public getResorts(): void {
        this.resortService.getResortByAccount().subscribe(
            (res: ResortResponse) => {
                if (res.status === 'SUCCESS') {
                    this.dataSource = new MatTableDataSource(res.data as ResortModel[]);
                }
            }
        )
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public createResort(resort: ResortModel): void {
        this.resortService.createResort(resort).subscribe(
            (res: ResortResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể tạo khu nghỉ dưỡng này!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getResorts();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public updateResort(resort: ResortModel): void {
        this.resortService.updateResort(resort).subscribe(
            (res: ResortResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Cập nhật thông tin thất bại!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getResorts();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveResort(form: FormGroup): void {
        const resort: ResortModel = {
            _id: form.get('id')?.value,
            name: form.get('name')?.value,
            address: form.get('address')?.value,
            images: form.get('images')?.value,
            about: form.get('about')?.value,
            tourism: form.get('tourism')?.value,
            price: form.get('price')?.value,
            reservationLimit: form.get('reservationLimit')?.value,
            phone: form.get('phone')?.value,
            rate: 0,
            votesNum: 0
        }

        switch (form.get('isEdit')?.value) {
            case 'create':
                this.createResort(resort);
                break;
            case 'update':
                this.updateResort(resort);
                break;
        }
    }

    public openManageResortDialog(resort?: ResortModel) {
        const dialogRef = this.dialog.open(ManageResortDialogComponent, {
            height: '90vh',
            width: '60vw',
            data: resort
        })

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.saveResort(data);
            }
        })
    }
}
