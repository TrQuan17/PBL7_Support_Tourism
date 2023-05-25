import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { CategoryModel, CategoryResponse, TourismModel, TourismResponse } from 'src/app/common/models';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnChanges{
    @Input() tourismResponse!: TourismResponse;
    @Input() categoryResponse!: CategoryResponse;
    @Output() categoryEmitter = new EventEmitter<CategoryModel>;

    public tourismsList: TourismModel[] = [];
    public categoriesList: CategoryModel[] = [];
    public categorySelect = 'All';

    public ngOnChanges(changes: SimpleChanges): void {
        if(changes?.['tourismResponse']?.currentValue) {
            this.tourismResponse = clone(changes?.['tourismResponse'].currentValue)
            this.tourismsList = this.tourismResponse.data as TourismModel[];
        }

        if(changes?.['categoryResponse']?.currentValue) {
            this.categoryResponse = clone(changes?.['categoryResponse'].currentValue)
            this.categoriesList = this.categoryResponse.data as CategoryModel[];
        }
    }

    public getCategory(category?: CategoryModel) {
        this.categorySelect = category ? category.name : 'All'
        this.categoryEmitter.emit(category)
    }
}
