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
    @Output() postEmitter = new EventEmitter<FormGroup>;

    public postForm!: FormGroup;
    public account?: AccountModel;
    public postsList: any[] = [];

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

        if(changes?.['postResponse']?.currentValue) {
            this.postResponse = clone(changes?.['postResponse'].currentValue);
            if(this.postResponse?.status === 'SUCCESS') {
                this.postsList = (this.postResponse.data as PostModel[]).map(value => {
                    value.account = value.account as AccountModel;
                    return value;
                })
            }
        }
    }

    public initForm(): void {
        this.postForm = this.fb.group({
            title: new FormControl(null, { validators: Validators.required }),
            content: new FormControl(null, { validators: Validators.required }),
            images: new FormControl([])
        })
    }

    public writePost(): void {
        this.postEmitter.emit(this.postForm);
    }
}
