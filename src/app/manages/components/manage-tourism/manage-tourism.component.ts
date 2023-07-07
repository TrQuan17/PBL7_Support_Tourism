import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageTourismDialogComponent } from '../manage-tourism-dialog/manage-tourism-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { TourismService } from 'src/app/common/services';
import { ConfirmDialogConfig, SnackBarPanelClass, TourismModel, TourismResponse } from 'src/app/common/models';
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
    public keyWord = '';
    public currentPage = 1;

    constructor(
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private tourismService: TourismService
    ) { }

    ngOnInit(): void {
        this.getTourisms();
    }

    public getTourisms(): void {
        this.tourismService.getTourismByAccount(this.keyWord, this.currentPage).subscribe(
            (res: TourismResponse) => {
                if (res.status === 'SUCCESS') {
                    this.dataSource = new MatTableDataSource(res.data as TourismModel[]);
                }
            }
        )
    }

    public searchTourism(q: string) {
        this.keyWord = q;
        this.currentPage = 1;
        this.getTourisms();
    }

    public createTourism(form: FormData): void {
        this.tourismService.createTourism(form).subscribe(
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

    public updateTourism(form: FormData): void {
        this.tourismService.updateTourism(form).subscribe(
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

    public deleteTourism(tourism: TourismModel) {
        this.tourismService.deleteTourism(tourism).subscribe(
            (res: TourismResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Xóa dữ liệu không thành công';

                if(res.status === 'SUCCESS') {
                    snackBarPanel = SnackBarPanelClass.successClass;
                    message = 'Xóa dữ liệu thành công';

                    this.getTourisms();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveTourism(form: FormData): void {
        switch (form.get('isEdit')) {
            case 'create':
                this.createTourism(form);
                break;
            case 'update':
                this.updateTourism(form);
                break;
        }
    }

    public openManageTourismDialog(tourism?: TourismModel) {
        const dialogRef = this.dialog.open(ManageTourismDialogComponent, {
            height: '90vh',
            width: '70vw',
            disableClose: true,
            autoFocus: false,
            data: tourism
        })

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.saveTourism(data);
            }
        })
    }

    public confirmDeleteTourism(tourism: TourismModel): void {
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
                this.deleteTourism(tourism);
            }
        })
    }

    public goPage(page: number): void {
        this.currentPage = page;
        this.getTourisms();
    }
}
