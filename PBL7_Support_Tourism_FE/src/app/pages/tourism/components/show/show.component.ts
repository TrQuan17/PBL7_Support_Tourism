import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { clone } from 'lodash';
import { CategoryModel, CategoryResponse, SnackBarPanelClass, TourismModel, TourismResponse } from 'src/app/common/models';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnChanges{
    @Input() tourismResponse!: TourismResponse;
    @Input() categoryResponse!: CategoryResponse;
    @Input() searchTourism = ''; 
    @Output() categoryEmitter = new EventEmitter<CategoryModel>;

    public tourismsList: TourismModel[] = [];
    public categoriesList: CategoryModel[] = [];
    public categorySelect = 'All';

    constructor(
        public snackbar: MatSnackBar,
        private clipboard: Clipboard
    ) { }

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

    public copyLink(): void {
        this.clipboard.copy(window.location.href);

        const message = 'Đã sao chép đương dẫn!';
        const panelClass = SnackBarPanelClass.successClass;

        SNACK_BAR_CONFIG.panelClass = panelClass;
        this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
    }
}
