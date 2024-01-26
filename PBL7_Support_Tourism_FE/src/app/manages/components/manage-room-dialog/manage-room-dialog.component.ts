/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomModel } from 'src/app/common/models/room.model';

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
        public dialogRef: MatDialogRef<ManageRoomDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: any
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData?.room);
        this.imagePreview = this.dialogData?.room?.image;
    }

    public initForm(data?: RoomModel): void {
        this.roomForm = this.fb.group({
            _id: new FormControl(data?._id),
            name: new FormControl(data?.name, Validators.required),
            image: new FormControl(data?.image),
            price: new FormControl(data?.price, { validators: [Validators.required, Validators.min(0)] }),
            limit: new FormControl(data?.limit, { validators:  [Validators.required, Validators.min(0)] }),
            resort: new FormControl(this.dialogData.resort),
            isEdit: new FormControl(data ? 'update' : 'create')
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

        if(this.dialogData?.room) {
            formData.append('_id', this.roomForm.get('_id')?.value);
        }

        const fields = ['name', 'price', 'limit', 'resort', 'isEdit'];
        fields.forEach(element => {
            formData.append(element, this.roomForm.get(element)?.value);
        })

        formData.append('imageUpload', this.imageFile as File);

        this.dialogRef.close(formData);
    }
}
