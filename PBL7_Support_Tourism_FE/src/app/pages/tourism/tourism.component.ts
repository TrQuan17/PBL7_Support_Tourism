import { Component, OnInit } from '@angular/core';
import { CategoryModel, CategoryResponse, TourismModel, TourismResponse } from 'src/app/common/models';
import { CategoryService, TourismService } from 'src/app/common/services';


@Component({
    selector: 'app-tourism',
    templateUrl: './tourism.component.html',
    styleUrls: ['./tourism.component.scss']
})
export class TourismComponent implements OnInit {
    public tourismResponse!: TourismResponse;
    public categoryResponse!: CategoryResponse;
    public category?: CategoryModel;
    public currentPage = 1;
    public keyWord = '';

    constructor(
        private tourismService: TourismService,
        private categoryService: CategoryService
    ) {}
    
    public ngOnInit(): void {
        this.getTourisms();
        this.getCategories();
    }

    public searchTourism(text: string): void {
        this.keyWord = text;
        this.getTourisms();
    }

    public getTourisms(): void {
        this.tourismService.getTourismsAndSearch(this.keyWord, this.currentPage).subscribe(
            (res: TourismResponse) => {
                this.tourismResponse = res;
            }
        )
    }

    public getCategories(): void {
        this.categoryService.getCategoriesAndSearch().subscribe(
            (res: CategoryResponse) => {
                this.categoryResponse = res;
            }
        )
    }

    public selectedCategory(category?: CategoryModel): void {
        this.currentPage = 1;
        this.category = category;

        if(this.category) {
            this.getTourismByCategory(this.category);
        }
        else {
            this.getTourisms();
        }
    }

    public getTourismByCategory(category: CategoryModel): void {
            const categoryId = category._id as string;
            
            this.tourismService.getTourismsByCategory(categoryId, this.keyWord, this.currentPage).subscribe(
                (res: TourismResponse) => {
                    this.tourismResponse = res;
                }
            )
    }

    public goPage(page: number): void {
        this.currentPage = page;

        if(this.category) {
            this.getTourismByCategory(this.category);
        }
        else {
            this.getTourisms();
        }
    }

    public isDisableNext() {
        if(this.tourismResponse?.status === 'SUCCESS') {
            return (this.tourismResponse.data as TourismModel[]).length < 5;
        }
        return true;
    }
}
