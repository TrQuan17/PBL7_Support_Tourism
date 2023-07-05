import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogConfig, ResortModel, ResortResponse, SnackBarPanelClass } from 'src/app/common/models';
import { ResortService } from 'src/app/common/services';
import { ManageResortDialogComponent } from '../manage-resort-dialog/manage-resort-dialog.component';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';

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

    public createResort(form: FormData): void {
        this.resortService.createResort(form).subscribe(
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

    public updateResort(form: FormData): void {
        this.resortService.updateResort(form).subscribe(
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

    public deleteResort(resort: ResortModel) {
        this.resortService.deleteResort(resort).subscribe(
            (res: ResortResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Xóa dữ liệu không thành công';
                if(res.status === 'SUCCESS') {
                    snackBarPanel = SnackBarPanelClass.successClass;
                    message = 'Xóa dữ liệu thành công';
                    this.getResorts();
                }
                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveResort(form: FormData): void {
        switch (form.get('isEdit')) {
            case 'create':
                this.createResort(form);
                break;
            case 'update':
                this.updateResort(form);
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

    public confirmDeleteResort(resort: ResortModel): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'delete-dialog',
            header: 'Xác nhận xóa khu nghỉ dưỡng',
            message: `Bạn xác nhận xóa khu nghỉ dưỡng ${resort.name} ?`,
            image: resort.images[0]
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.deleteResort(resort);
            }
        })
    }
}
