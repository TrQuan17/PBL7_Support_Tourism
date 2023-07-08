/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceModel } from 'src/app/common/models';

@Component({
    selector: 'app-manage-service-dialog',
    templateUrl: './manage-service-dialog.component.html',
    styleUrls: ['./manage-service-dialog.component.scss']
})
export class ManageServiceDialogComponent implements OnInit {
    public serviceForm!: FormGroup;
    public imageFile?: File;
    public imagePreview = '';

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ManageServiceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: any
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData.service);
        this.imagePreview = this.dialogData?.service?.image;
    }

    public initForm(data?: ServiceModel): void {
        this.serviceForm = this.fb.group({
            _id: new FormControl(data?._id),
            name: new FormControl(data?.name, { validators: Validators.required }),
            image: new FormControl(data?.image),
            about: new FormControl(data?.about, { validators: Validators.required }),
            price: new FormControl(data?.price, { validators: [Validators.required, Validators.min(0)] }),
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

    public saveService(): void {
        const formData = new FormData();

        if(this.dialogData?.service) {
            formData.append('_id', this.serviceForm.get('_id')?.value);
        }

        const fields = ['name', 'about', 'price', 'resort', 'isEdit']
        fields.forEach(element => {
            formData.append(element, this.serviceForm.get(element)?.value);
        })

        formData.append('imageUpload', this.imageFile as File);

        this.dialogRef.close(formData);
    }
}
