/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AccountModel, AccountResponse, PostModel, PostResponse } from '../../models';
import { clone } from 'lodash';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {
    @Input() authResponse?: AccountResponse;
    @Input() guestResponse?: AccountResponse;
    @Input() postResponse?: PostResponse;
    @Output() postEmitter = new EventEmitter<FormData>;
    @Output() sortPostEmitter = new EventEmitter<string>;
    @Output() moreEmitter = new EventEmitter<void>;

    public postForm!: FormGroup;
    public account?: AccountModel;
    public postsList: any[] = [];
    public showWritePost = false;
    public imagesFile: File[] = [];
    public imagesPreview: string[] = [];
    public sortAsc = false;

    constructor(
        private fb: FormBuilder
    ) {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['authResponse']?.currentValue) {
            this.authResponse = clone(changes?.['authResponse'].currentValue);
            if (this.authResponse?.status === 'SUCCESS') {
                this.account = this.authResponse?.data as AccountModel;
            }
        }

        if (changes?.['guestResponse']?.currentValue) {
            this.guestResponse = clone(changes?.['guestResponse'].currentValue);
            if (this.guestResponse?.status === 'SUCCESS') {
                this.account = this.guestResponse?.data as AccountModel;
            }
        }

        if (changes?.['postResponse']?.currentValue) {
            this.postResponse = clone(changes?.['postResponse'].currentValue);
            if (this.postResponse?.status === 'SUCCESS') {
                console.log(this.postsList);
                this.postsList.push(...this.postResponse.data as PostModel[]);
            }
        }
    }

    public onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imagesFile = Array.from(event.target.files);

            this.imagesFile.forEach(element => {
                const reader = new FileReader();
                reader.onload = () => this.imagesPreview.push(reader.result as string);
                reader.readAsDataURL(element);
            })
        }
    }

    public initForm(): void {
        this.postForm = this.fb.group({
            title: new FormControl(null, { validators: Validators.required }),
            content: new FormControl(null, { validators: Validators.required }),
            images: new FormControl([])
        })
    }

    sortPost(): void {
        this.sortAsc = !this.sortAsc;
        this.postsList = [];
        
        const sort = this.sortAsc ? 'asc' : 'desc';
        this.sortPostEmitter.emit(sort);
    }

    public cancelPost(): void {
        this.showWritePost = false;
        this.imagesPreview = [];
        this.imagesFile = [];
        this.postForm.get('title')?.reset();
        this.postForm.get('content')?.reset();
        this.postForm.get('images')?.reset();
    }

    public writePost(): void {
        const formData = new FormData();

        const fields = ['title', 'content'];
        fields.forEach(element => {
            formData.append(element, this.postForm.get(element)?.value);
        })

        this.imagesFile.forEach(element => {
            formData.append('images', element);
        })

        this.postEmitter.emit(formData);
    }

    public morePost(): void {
        this.moreEmitter.emit();
    }
}
