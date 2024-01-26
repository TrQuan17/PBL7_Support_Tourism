/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryModel } from 'src/app/common/models';

@Component({
    selector: 'app-manage-category-dialog',
    templateUrl: './manage-category-dialog.component.html',
    styleUrls: ['./manage-category-dialog.component.scss']
})
export class ManageCategoryDialogComponent implements OnInit {
    public categoryForm!: FormGroup;
    public imageFile?: File;
    public imagePreview = '';

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ManageCategoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: CategoryModel
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData);
    }

    public initForm(category?: CategoryModel): void {
        this.categoryForm = this.fb.group({
            _id: new FormControl(category?._id),
            name: new FormControl(category?.name, Validators.required),
            about: new FormControl(category?.about, Validators.required),
            isEdit: new FormControl(category ? 'update' : 'create')
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

    public saveCategory(): void {
        const formData = new FormData();

        if(this.dialogData) {
            formData.append('_id', this.categoryForm.get('_id')?.value);
        }

        const fields = ['name', 'about', 'isEdit'];
        fields.forEach(element => {
            formData.append(element, this.categoryForm.get(element)?.value);
        })

        formData.append('background', this.imageFile as File);

        this.dialogRef.close(formData);
    }
}
