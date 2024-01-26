/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { clone } from 'lodash';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FavouriteModel } from 'src/app/common/models';

@Component({
    selector: 'app-create-trip-dialog',
    templateUrl: './create-trip-dialog.component.html',
    styleUrls: ['./create-trip-dialog.component.scss']
})
export class CreateTripDialogComponent implements OnInit {
    public tripForm!: FormGroup;
    public savedToTrip: any[] = [];
    public favouritesList: any[] = [];
    public imageFile?: File;
    public imagePreview = '';

    constructor(
        public dialogRef: MatDialogRef<CreateTripDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: any[],
        private fb: FormBuilder
    ) {
        this.favouritesList = clone(dialogData);
    }

    ngOnInit(): void {
        this.intitForm();
    }

    public intitForm(): void {
        this.tripForm = this.fb.group({
            name: new FormControl(null, Validators.required),
            about: new FormControl(null, Validators.required),
            background: new FormControl(),
            favourites: new FormControl([], Validators.minLength(1))
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

    public saveTrip(): void {
        const favouritesId = this.savedToTrip.map((value: FavouriteModel) => value._id);

        if(!favouritesId.length) return; 

        this.tripForm.get('favourites')?.setValue(favouritesId);

        const formData = new FormData();
        const fields = ['name', 'about']

        fields.forEach(element => {
            formData.append(element, this.tripForm.get(element)?.value);
        })

        this.tripForm.get('favourites')?.value.forEach((element: string) => {
            formData.append('favourites', element);
        })

        formData.append('background', this.imageFile as File);

        this.dialogRef.close(formData);
    }

    public drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }
}
