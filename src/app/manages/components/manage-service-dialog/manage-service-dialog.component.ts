import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResortModel, ResortResponse, ServiceModel } from 'src/app/common/models';
import { ResortService } from 'src/app/common/services';

@Component({
    selector: 'app-manage-service-dialog',
    templateUrl: './manage-service-dialog.component.html',
    styleUrls: ['./manage-service-dialog.component.scss']
})
export class ManageServiceDialogComponent implements OnInit {
    public resortsList: ResortModel[] = [];
    public serviceForm!: FormGroup;
    public imagesFile: File[] = [];

    constructor(
        private fb: FormBuilder,
        private resortService: ResortService,
        public dialogRef: MatDialogRef<ManageServiceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData?: ServiceModel
    ) { }

    ngOnInit(): void {
        this.initForm(this.dialogData);
        this.getResorts();
    }

    public initForm(data?: ServiceModel): void {
        this.serviceForm = this.fb.group({
            id: new FormControl(data?._id),
            name: new FormControl(data?.name, { validators: Validators.required }),
            images: new FormControl([]),
            about: new FormControl(data?.about, { validators: Validators.required }),
            price: new FormControl(data?.price, { validators: Validators.required }),
            resort: new FormControl((data?.resort as ResortModel)._id, { validators: Validators.required }),
            isEdit: new FormControl(data ? 'update' : 'create')
        })
    }

    public getResorts(): void {
        this.resortService.getResortByAccount().subscribe(
            (res: ResortResponse) => {
                if (res.status === 'SUCCESS') {
                    this.resortsList = res.data as ResortModel[];
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

    public saveService(): void {
        this.dialogRef.close(this.serviceForm);
    }
}
