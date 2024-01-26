/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResortModel, TourismModel, TourismResponse } from 'src/app/common/models';
import { TourismService } from 'src/app/common/services';

@Component({
    selector: 'app-manage-resort-dialog',
    templateUrl: './manage-resort-dialog.component.html',
    styleUrls: ['./manage-resort-dialog.component.scss']
})
export class ManageResortDialogComponent implements OnInit {
    public tourismsList: TourismModel[] = [];
    public resortForm!: FormGroup;
    public imagesFile: File[] = [];
    public imagesPreview: string[] = [];

    constructor(
        private fb: FormBuilder,
        private tourismService: TourismService,
        public dialogRef: MatDialogRef<ManageResortDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: ResortModel
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData);
        this.getTourisms();
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

    public onFileChange(event: any): void {
        this.imagesPreview = [];
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
