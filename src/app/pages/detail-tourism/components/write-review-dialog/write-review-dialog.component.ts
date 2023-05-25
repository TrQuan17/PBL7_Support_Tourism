import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TourismModel } from 'src/app/common/models';

@Component({
    selector: 'app-write-review-dialog',
    templateUrl: './write-review-dialog.component.html',
    styleUrls: ['./write-review-dialog.component.scss']
})
export class WriteReviewDialogComponent {
    public reviewForm!: FormGroup;

    constructor(
        private formBuider: FormBuilder,
        public dialogRef: MatDialogRef<WriteReviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: TourismModel
    ) {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.reviewForm = this.formBuider.group({
            account: new FormControl(null),
            vote: new FormControl(null),
            title: new FormControl(null),
            text: new FormControl(null),
            images: new FormControl([]),
            time: new FormControl(null),
            tourism: new FormControl(this.dialogData?._id)
        });
    }

    public writeReview(): void {
        this.dialogRef.close(this.reviewForm);
    }
}
