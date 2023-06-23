/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResortModel, TourismModel } from '../../models';

@Component({
    selector: 'app-write-review-dialog',
    templateUrl: './write-review-dialog.component.html',
    styleUrls: ['./write-review-dialog.component.scss']
})
export class WriteReviewDialogComponent {
    public reviewForm!: FormGroup;
    public imagesFile: File[] = [];
    public model?: TourismModel | ResortModel;

    constructor(
        private formBuider: FormBuilder,
        public dialogRef: MatDialogRef<WriteReviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: any
    ) {
        this.createFormGroup();
        this.setIdFormControl();
    }

    public createFormGroup(): void {
        this.reviewForm = this.formBuider.group({
            vote: new FormControl(null),
            title: new FormControl('', { validators: Validators.required }),
            text: new FormControl('', { validators: Validators.required }),
            images: new FormControl([]),
            time: new FormControl(null, { validators: Validators.required }),
            tourism: new FormControl(),
            resort: new FormControl()
        });
    }

    public setIdFormControl(): void {
        switch (this.dialogData.field) {
            case 'tourism':
                this.model = this.dialogData.data as TourismModel;
                this.reviewForm.get('tourism')?.setValue(this.model._id);
                break;

            case 'resort':
                this.model = this.dialogData.data as ResortModel;
                this.reviewForm.get('resort')?.setValue(this.model._id);
                break;
        }
    }

    public voteTourim(vote: number): void {
        this.reviewForm.get('vote')?.setValue(vote);
    }

    public onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imagesFile = Array.from(event.target.files);
        }
    }

    public writeReview(): void {
        const formData = new FormData();

        const fields = ['vote', 'title', 'text', 'time', 'tourism', 'resort']
        fields.forEach(element => {
            formData.append(element, this.reviewForm.get(element)?.value);
        })

        this.imagesFile.forEach((element: File) => {
            formData.append('images', element);
        })

        console.log(this.reviewForm);
        // this.dialogRef.close(formData);
    }
}
