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
export class ManageResortDialogComponent implements OnInit{
    public tourismsList: TourismModel[] = [];
    public resortForm!: FormGroup;
    public imagesFile: File[] = [];

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
            id: new FormControl(data?._id),
            name: new FormControl(data?.name, { validators: Validators.required }),
            address: new FormControl(data?.address, { validators: Validators.required }),
            images: new FormControl([]),
            about: new FormControl(data?.about, { validators: Validators.required }),
            phone: new FormControl(data?.phone,  { validators: Validators.required }),
            price: new FormControl(data?.price, { validators: Validators.required }),
            reservationLimit: new FormControl(data?.reservationLimit,  { validators: Validators.required }),
            tourism: new FormControl((data?.tourism as TourismModel)._id, { validators: Validators.required }),
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imagesFile = Array.from(event.target.files);
        }
    }

    public saveResort(): void {
        this.dialogRef.close(this.resortForm);
    }
}
