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
            id: new FormControl(data?._id),
            name: new FormControl(data?.name, { validators: Validators.required }),
            address: new FormControl(data?.address, { validators: Validators.required }),
            images: new FormControl([]),
            title: new FormControl(data?.title, { validators: Validators.required }),
            about: new FormControl(data?.about, { validators: Validators.required }),
            category: new FormControl(data?.category, { validators: Validators.required }),
            isEdit: new FormControl(data ? 'update': 'create')
        })
    }

    public getCategories(): void {
        this.categoryService.getCategories().subscribe(
            (res: CategoryResponse) => {
                if(res.status === 'SUCCESS') {
                    this.categoriesList = res.data as CategoryModel[];
                }
            }
        )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imagesFile = Array.from(event.target.files);
          }
    }

    public saveTourism(): void {
        this.dialogRef.close(this.tourismForm);
    }
}
