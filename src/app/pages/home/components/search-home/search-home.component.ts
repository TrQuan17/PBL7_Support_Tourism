import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search-home',
    templateUrl: './search-home.component.html',
    styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit, OnChanges {
    @Input() resetSearch = false;
    @Output() searchEmitter = new EventEmitter<FormGroup>;

    public searchForm!: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['resetSearch']?.currentValue) {
            this.resetSearch = changes?.['resetSearch'].currentValue;
            if(this.resetSearch) {
                this.searchForm.get('text')?.reset();
                this.searchForm.get('type')?.reset();
            }
        }
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
