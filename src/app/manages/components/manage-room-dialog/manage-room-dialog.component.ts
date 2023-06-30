/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ResortModel, SnackBarPanelClass } from 'src/app/common/models';
import { RoomResponse } from 'src/app/common/models/room.model';
import { RoomService } from 'src/app/common/services/room.service';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-manage-room-dialog',
    templateUrl: './manage-room-dialog.component.html',
    styleUrls: ['./manage-room-dialog.component.scss']
})
export class ManageRoomDialogComponent implements OnInit {
    public roomForm!: FormGroup;
    public imageFile?: File;
    public imagePreview = '';

    constructor(
        private fb: FormBuilder,
        private roomService: RoomService,
        public snackbar: MatSnackBar,
        public dialogRef: MatDialogRef<ManageRoomDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: ResortModel
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData);
    }

    public initForm(data?: ResortModel): void {
        this.roomForm = this.fb.group({
            name: new FormControl(null, Validators.required),
            price: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
            limit: new FormControl(0, { validators:  [Validators.required, Validators.min(0)] }),
            resort: new FormControl(data?._id)
        })
    }

    public onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imageFile = event.target.files[0];

            const reader = new FileReader();
            reader.onload = () => this.imagePreview = reader.result as string;
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    public saveRoom(): void {
        const formData = new FormData();

        const fields = ['name', 'price', 'limit', 'resort'];
        fields.forEach(element => {
            formData.append(element, this.roomForm.get(element)?.value);
        })

        formData.append('image', this.imageFile as File);

        this.roomService.createRoom(formData).subscribe(
            (res: RoomResponse) => {
                let message = 'Tạo phòng không thành công';
                let snackBarPanel = SnackBarPanelClass.errorClass;

                if(res.status === 'SUCCESS') {
                    message = 'Tạo phòng thành công';
                    snackBarPanel = SnackBarPanelClass.successClass;
                    this.dialogRef.close(true);
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }
}
