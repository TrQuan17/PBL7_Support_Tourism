import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search-home',
    templateUrl: './search-home.component.html',
    styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit {
    @Output() searchEmitter = new EventEmitter<FormGroup>;

    public searchForm!: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    public initForm(): void {
        this.searchForm = this.fb.group({
            text: new FormControl(null, Validators.required),
            type: new FormControl(null, Validators.required)
        })
    }

    public search(): void {
        this.searchEmitter.emit(this.searchForm);
    }
}
