import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceModel, ServiceResponse, SnackBarPanelClass } from 'src/app/common/models';
import { ServiceService } from 'src/app/common/services';
import { ManageServiceDialogComponent } from '../manage-service-dialog/manage-service-dialog.component';

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

    public createService(service: ServiceModel): void {
        this.serviceService.createService(service).subscribe(
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

    public updateService(service: ServiceModel): void {
        this.serviceService.updateService(service).subscribe(
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

    public saveService(form: FormGroup): void {
        const service: ServiceModel = {
            _id: form.get('id')?.value,
            name: form.get('name')?.value,
            images: form.get('images')?.value,
            about: form.get('about')?.value,
            resort: form.get('resort')?.value,
            price: form.get('price')?.value
        }

        switch (form.get('isEdit')?.value) {
            case 'create':
                this.createService(service);
                break;
            case 'update':
                this.updateService(service);
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
}
