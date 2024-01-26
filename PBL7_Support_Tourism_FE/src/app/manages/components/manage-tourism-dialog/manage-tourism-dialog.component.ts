/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryModel, CategoryResponse, TourismModel } from 'src/app/common/models';
import { CategoryService } from 'src/app/common/services';

@Component({
    selector: 'app-manage-tourism-dialog',
    templateUrl: './manage-tourism-dialog.component.html',
    styleUrls: ['./manage-tourism-dialog.component.scss']
})
export class ManageTourismDialogComponent implements OnInit{
    public categoriesList: CategoryModel[] = [];
    public tourismForm!: FormGroup;
    public imagesFile: File[] = [];
    public imagesPreview: string[] = [];

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        public dialogRef: MatDialogRef<ManageTourismDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: TourismModel
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData);
        this.getCategories();
    }

    public initForm(data?: TourismModel): void {
        this.tourismForm = this.fb.group({
            _id: new FormControl(data?._id),
            name: new FormControl(data?.name, { validators: Validators.required }),
            address: new FormControl(data?.address, { validators: Validators.required }),
            images: new FormControl(data?.images),
            title: new FormControl(data?.title, { validators: Validators.required }),
            about: new FormControl(data?.about, { validators: Validators.required }),
            category: new FormControl((data?.category as CategoryModel)._id, { validators: Validators.required }),
            isEdit: new FormControl(data ? 'update': 'create')
        })
    }

    public getCategories(): void {
        this.categoryService.getCategoriesAndSearch().subscribe(
            (res: CategoryResponse) => {
                if(res.status === 'SUCCESS') {
                    this.categoriesList = res.data as CategoryModel[];
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
        let imageArr: string[] = this.tourismForm.get('images')?.value;
        imageArr = imageArr.filter((item:string) => item !== image);

        this.tourismForm.get('images')?.setValue(imageArr);
    }

    public saveTourism(): void {
        const formData = new FormData();

        if(this.dialogData) {
            formData.append('_id', this.tourismForm.get('_id')?.value);

            (this.tourismForm.get('images')?.value as string[]).forEach((element: string) => {
                formData.append('images', element);
            })
        }

        const fields = ['name', 'address', 'title', 'about', 'category','isEdit'];
        fields.forEach(element => {
            formData.append(element, this.tourismForm.get(element)?.value)
        });

        this.imagesFile.forEach(element => {
            formData.append('imagesUpload', element);
        })
        this.dialogRef.close(formData);
    }
}
