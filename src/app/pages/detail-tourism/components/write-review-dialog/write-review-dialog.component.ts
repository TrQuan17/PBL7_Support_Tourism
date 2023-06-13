/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TourismModel } from 'src/app/common/models';

@Component({
    selector: 'app-write-review-dialog',
    templateUrl: './write-review-dialog.component.html',
    styleUrls: ['./write-review-dialog.component.scss']
})
export class WriteReviewDialogComponent {
    public reviewForm!: FormGroup;
    public imagesFile: File[] = [];

    constructor(
        private formBuider: FormBuilder,
        public dialogRef: MatDialogRef<WriteReviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: TourismModel
    ) {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.reviewForm = this.formBuider.group({
            vote: new FormControl(null),
            title: new FormControl('', { validators: Validators.required }),
            text: new FormControl('', { validators: Validators.required }),
            images: new FormControl([]),
            time: new FormControl(null, { validators: Validators.required }),
            tourism: new FormControl(this.dialogData?._id)
        });
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

        const fields = ['vote', 'title', 'text', 'time', 'tourism']
        fields.forEach(element => {
            formData.append(element, this.reviewForm.get(element)?.value);
        })

        this.imagesFile.forEach((element: File) => {
            formData.append('images', element);
        })
        
        this.dialogRef.close(formData);
    }
}
