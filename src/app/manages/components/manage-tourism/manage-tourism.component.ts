import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageTourismDialogComponent } from '../manage-tourism-dialog/manage-tourism-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { TourismService } from 'src/app/common/services';
import { ConfirmDialogConfig, SnackBarPanelClass, TourismModel, TourismResponse } from 'src/app/common/models';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';


@Component({
    selector: 'app-manage-tourism',
    templateUrl: './manage-tourism.component.html',
    styleUrls: ['./manage-tourism.component.scss']
})
export class ManageTourismComponent implements OnInit {
    public displayedColumns: string[] = ['images', 'name', 'action'];
    public dataSource = new MatTableDataSource<TourismModel>;
    public tourismsList: TourismModel[] = [];

    constructor(
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private tourismService: TourismService
    ) { }

    ngOnInit(): void {
        this.getTourisms();
    }

    public getTourisms(): void {
        this.tourismService.getTourismByAccount().subscribe(
            (res: TourismResponse) => {
                if (res.status === 'SUCCESS') {
                    this.dataSource = new MatTableDataSource(res.data as TourismModel[]);
                }
            }
        )
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public createTourism(tourism: TourismModel): void {
        this.tourismService.createTourism(tourism).subscribe(
            (res: TourismResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể tạo địa điểm này!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getTourisms();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public updateTourism(tourism: TourismModel): void {
        this.tourismService.updateTourism(tourism).subscribe(
            (res: TourismResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Cập nhật thông tin thất bại!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getTourisms();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveTourism(form: FormGroup): void {
        const tourism: TourismModel = {
            _id: form.get('id')?.value,
            name: form.get('name')?.value,
            address: form.get('address')?.value,
            images: form.get('images')?.value,
            title: form.get('title')?.value,
            about: form.get('about')?.value,
            category: form.get('category')?.value,
            rate: 0,
            votesNum: 0
        }

        switch (form.get('isEdit')?.value) {
            case 'create':
                this.createTourism(tourism);
                break;
            case 'update':
                this.updateTourism(tourism);
                break;
        }
    }

    public openManageTourismDialog(tourism?: TourismModel) {
        const dialogRef = this.dialog.open(ManageTourismDialogComponent, {
            height: '90vh',
            width: '60vw',
            data: tourism
        })

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.saveTourism(data);
            }
        })
    }

    public deleteTourism(tourism: TourismModel): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'delete-dialog',
            header: 'Xác nhận xóa điểm du lịch',
            message: `Bạn xác nhận xóa điểm du lịch ${tourism.name} ?`,
            image: tourism.images[0]
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                const snackBarPanel = SnackBarPanelClass.successClass;
                const message = 'Xóa dữ liệu thành công';

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        })
    }
}
