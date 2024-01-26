import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    public searchForm: FormGroup = new FormGroup({});

    @Output() searchEmitter = new EventEmitter<string>;

    constructor(private formBuider: FormBuilder) {
        this.initForm();
    }

    public initForm(): void {
        this.searchForm = this.formBuider.group({
            text: new FormControl()
        });
    }

    public searchEvent(): void {
        this.searchEmitter.emit(this.searchForm.get('text')?.value);
    }
}
