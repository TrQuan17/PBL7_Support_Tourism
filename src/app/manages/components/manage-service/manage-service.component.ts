import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogConfig, ServiceModel, ServiceResponse, SnackBarPanelClass } from 'src/app/common/models';
import { ServiceService } from 'src/app/common/services';
import { ManageServiceDialogComponent } from '../manage-service-dialog/manage-service-dialog.component';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-manage-service',
    templateUrl: './manage-service.component.html',
    styleUrls: ['./manage-service.component.scss']
})
export class ManageServiceComponent implements OnInit {
    public displayedColumns: string[] = ['images', 'name', 'action'];
    public dataSource = new MatTableDataSource<ServiceModel>;

    constructor(
        public dialog: MatDialog,
        private snackbar: MatSnackBar,
        private serviceService: ServiceService
    ) { }

    ngOnInit(): void {
        this.getServices();
    }

    public getServices(): void {
        this.serviceService.getServicesByAccount().subscribe(
            (res: ServiceResponse) => {
                if (res.status === 'SUCCESS') {
                    this.dataSource = new MatTableDataSource(res.data as ServiceModel[]);
                }
            }
        )
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public createService(form: FormData): void {
        this.serviceService.createService(form).subscribe(
            (res: ServiceResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Bạn không thể tạo dịch vụ này!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getServices();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public updateService(form: FormData): void {
        this.serviceService.updateService(form).subscribe(
            (res: ServiceResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Cập nhật thông tin thất bại!';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getServices();
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveService(form: FormData): void {

        switch (form.get('isEdit')) {
            case 'create':
                this.createService(form);
                break;
            case 'update':
                this.updateService(form);
                break;
        }
    }

    public openManageServiceDialog(service?: ServiceModel) {
        const dialogRef = this.dialog.open(ManageServiceDialogComponent, {
            height: '90vh',
            width: '60vw',
            data: service
        })

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.saveService(data);
            }
        })
    }

    public deleteService(service: ServiceModel): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'delete-dialog',
            header: 'Xác nhận xóa dịch vụ du lịch',
            message: `Bạn xác nhận xóa dịch vụ ${service.name} ?`,
            image: service.image
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
