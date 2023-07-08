import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogConfig, ResortModel, ServiceModel, ServiceResponse, SnackBarPanelClass } from 'src/app/common/models';
import { RoomModel, RoomResponse } from 'src/app/common/models/room.model';
import { ServiceService } from 'src/app/common/services';
import { RoomService } from 'src/app/common/services/room.service';
import { ManageServiceDialogComponent } from '../manage-service-dialog/manage-service-dialog.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';
import { ManageRoomDialogComponent } from '../manage-room-dialog/manage-room-dialog.component';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-manage-action-resort-dialog',
    templateUrl: './manage-action-resort-dialog.component.html',
    styleUrls: ['./manage-action-resort-dialog.component.scss']
})
export class ManageActionResortDialogComponent {
    public roomsList: RoomModel[] = [];
    public servicesList: ServiceModel[] = [];

    constructor(
        public dialogRef: MatDialogRef<ManageActionResortDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: ResortModel,
        public dialog: MatDialog,
        public snackbar: MatSnackBar,
        private roomService: RoomService,
        private serviceService: ServiceService
    ) {
        this.getRoomsResort(this.dialogData);
        this.getServicesResort(this.dialogData);
    }

    public getRoomsResort(resort: ResortModel): void {
        this.roomService.getRoomsByResort(resort._id as string).subscribe(
            (res: RoomResponse) => {
                if (res.status === 'SUCCESS') {
                    this.roomsList = res.data as RoomModel[];
                }
            }
        )
    }

    public getServicesResort(resort: ResortModel): void {
        this.serviceService.getServicesByResort(resort._id as string).subscribe(
            (res: ServiceResponse) => {
                if (res.status === 'SUCCESS') {
                    this.servicesList = res.data as ServiceModel[];
                }
            }
        )
    }

    public createService(form: FormData): void {
        this.serviceService.createService(form).subscribe(
            (res: ServiceResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Tạo dữ liệu không thành công';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getServicesResort(this.dialogData);
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
                let message = 'Cập nhật thông tin không thành công';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getServicesResort(this.dialogData);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public deleteService(service: ServiceModel): void {
        this.serviceService.deleteService(service).subscribe(
            (res: ServiceResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Xóa dữ liệu không thành công';
                if (res.status === 'SUCCESS') {
                    snackBarPanel = SnackBarPanelClass.successClass;
                    message = 'Xóa dữ liệu thành công';
                    this.getServicesResort(this.dialogData);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public confirmDeleteService(service: ServiceModel): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'delete-dialog',
            header: 'Xác nhận xóa dịch vụ khu nghỉ dưỡng',
            message: `Bạn xác nhận xóa dịch vụ ${service.name} ?`,
            image: service.image
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            autoFocus: false,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.deleteService(service);
            }
        })
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
        const dataDialog = {
            resort: this.dialogData._id,
            service: service
        }
        const dialogRef = this.dialog.open(ManageServiceDialogComponent, {
            height: '90vh',
            width: '60vw',
            data: dataDialog
        })

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.saveService(data);
            }
        })
    }

    public createRoom(form: FormData): void {
        this.roomService.createRoom(form).subscribe(
            (res: RoomResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Tạo dữ liệu không thành công';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getRoomsResort(this.dialogData);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public updateRoom(form: FormData): void {
        this.roomService.updateRoom(form).subscribe(
            (res: RoomResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Cập nhật thông tin không thành công';

                if (res.status === 'SUCCESS') {
                    message = 'Cảm ơn sự đóng góp của bạn';
                    snackBarPanel = SnackBarPanelClass.successClass;

                    this.getRoomsResort(this.dialogData);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public deleteRoom(room: RoomModel): void {
        this.roomService.deleteRoom(room).subscribe(
            (res: RoomResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Xóa dữ liệu không thành công';

                if (res.status === 'SUCCESS') {
                    snackBarPanel = SnackBarPanelClass.successClass;
                    message = 'Xóa dữ liệu thành công';
                    this.getRoomsResort(this.dialogData);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public confirmDeleteRoom(room: RoomModel): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'delete-dialog',
            header: 'Xác nhận xóa phòng khu nghỉ dưỡng',
            message: `Bạn xác nhận xóa phòng khu nghỉ dưỡng ${room.name} ?`,
            image: room.image
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            autoFocus: false,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(confirm => {
            if (confirm) {
                this.deleteRoom(room);
            }
        })
    }

    public saveRoom(form: FormData): void {
        switch (form.get('isEdit')) {
            case 'create':
                this.createRoom(form);
                break;
            case 'update':
                this.updateRoom(form);
                break;
        }
    }

    public openManageRoomDialog(room?: RoomModel) {
        const dataDialog = {
            resort: this.dialogData._id,
            room: room
        }
        const dialogRef = this.dialog.open(ManageRoomDialogComponent, {
            height: '90vh',
            width: '60vw',
            data: dataDialog
        })

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.saveRoom(data);
            }
        })
    }

}

