/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResortModel, SnackBarPanelClass, TourismModel, TourismResponse } from 'src/app/common/models';
import { TourismService } from 'src/app/common/services';
import { ManageRoomDialogComponent } from '../manage-room-dialog/manage-room-dialog.component';
import { RoomService } from 'src/app/common/services/room.service';
import { RoomModel, RoomResponse } from 'src/app/common/models/room.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-manage-resort-dialog',
    templateUrl: './manage-resort-dialog.component.html',
    styleUrls: ['./manage-resort-dialog.component.scss']
})
export class ManageResortDialogComponent implements OnInit {
    public tourismsList: TourismModel[] = [];
    public roomsList: RoomModel[] = [];
    public resortForm!: FormGroup;
    public imagesFile: File[] = [];
    public imagesPreview: string[] = [];

    constructor(
        private fb: FormBuilder,
        private tourismService: TourismService,
        private roomService: RoomService,
        public dialog: MatDialog,
        public snackbar: MatSnackBar,
        public dialogRef: MatDialogRef<ManageResortDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: ResortModel
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData);
        this.getTourisms();

        if (this.dialogData) {
            this.getRoomsByResort(this.dialogData);
        }
    }

    public initForm(data?: ResortModel): void {
        this.resortForm = this.fb.group({
            _id: new FormControl(data?._id),
            name: new FormControl(data?.name, { validators: Validators.required }),
            address: new FormControl(data?.address, { validators: Validators.required }),
            images: new FormControl(data?.images),
            about: new FormControl(data?.about, { validators: Validators.required }),
            phone: new FormControl(data?.phone, { validators: Validators.required }),
            tourism: new FormControl((data?.tourism as TourismModel)?._id, { validators: Validators.required }),
            isEdit: new FormControl(data ? 'update' : 'create')
        })
    }

    public getTourisms(): void {
        this.tourismService.getTourismByAccount().subscribe(
            (res: TourismResponse) => {
                if (res.status === 'SUCCESS') {
                    this.tourismsList = res.data as TourismModel[];
                }
            }
        )
    }

    public getRoomsByResort(resort: ResortModel): void {
        this.roomService.getRoomsByResort(resort._id as string).subscribe(
            (res: RoomResponse) => {
                if (res.status === 'SUCCESS') {
                    this.roomsList = res.data as RoomModel[];
                }
            }
        )
    }

    public onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imagesFile = Array.from(event.target.files);

            this.imagesFile.forEach(element => {
                const reader = new FileReader();
                reader.onload = () => this.imagesPreview.push(reader.result as string);
                reader.readAsDataURL(element);
            })
        }
    }

    public deleteImage(image: string): void {
        let imageArr: string[] = this.resortForm.get('images')?.value;
        imageArr = imageArr.filter((item: string) => item !== image);

        this.resortForm.get('images')?.setValue(imageArr);
    }

    public openRoomDialog(resort: ResortModel): void {
        const roomDialogRef = this.dialog.open(ManageRoomDialogComponent, {
            data: resort
        })

        roomDialogRef.afterClosed().subscribe(() => {
            this.getRoomsByResort(this.dialogData as ResortModel);
        })
    }

    public deleteRoom(room: RoomModel): void {
        this.roomService.deleteRoom(room).subscribe(
            (res: RoomResponse) => {
                let message = 'Xóa phòng không thành công';
                let snackBarPanel = SnackBarPanelClass.errorClass;

                if (res.status === 'SUCCESS') {
                    message = 'Xóa phòng thành công';
                    snackBarPanel = SnackBarPanelClass.successClass;
                    this.getRoomsByResort(this.dialogData as ResortModel);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public saveResort(): void {
        const formData = new FormData();

        if (this.dialogData) {
            formData.append('_id', this.resortForm.get('_id')?.value);

            (this.resortForm.get('images')?.value as string[]).forEach((element: string) => {
                formData.append('images', element);
            })
        }

        const fields = ['name', 'address', 'about', 'phone', 'tourism', 'isEdit'];
        fields.forEach(element => {
            formData.append(element, this.resortForm.get(element)?.value)
        });

        this.imagesFile.forEach(element => {
            formData.append('imagesUpload', element);
        })
        this.dialogRef.close(formData);
    }
}
