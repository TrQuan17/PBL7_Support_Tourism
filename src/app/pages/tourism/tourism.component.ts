import { Component, OnInit } from '@angular/core';
import { CategoryModel, CategoryResponse, TourismResponse } from 'src/app/common/models';
import { CategoryService, TourismService } from 'src/app/common/services';


@Component({
    selector: 'app-tourism',
    templateUrl: './tourism.component.html',
    styleUrls: ['./tourism.component.scss']
})
export class TourismComponent implements OnInit {
    public tourismResponse!: TourismResponse;
    public categoryResponse!: CategoryResponse;
    public search?: string;

    constructor(
        private tourismService: TourismService,
        private categoryService: CategoryService
    ) {}
    
    public ngOnInit(): void {
        this.getTourisms();
        this.getCategories();
    }

    public searchTourism(text: string): void {
        this.search = text;
        console.log(this.search);
    }

    public getTourisms(): void {
        this.tourismService.getTourismsAndSearch().subscribe(
            (res: TourismResponse) => {
                this.tourismResponse = res;
            }
        )
    }

    public getCategories(): void {
        this.categoryService.getCategories().subscribe(
            (res: CategoryResponse) => {
                this.categoryResponse = res;
            }
        )
    }

    public getTourismByCategory(category?: CategoryModel): void {
        if(category) {
            this.tourismService.getTourismsByCategory(category).subscribe(
                (res: TourismResponse) => {
                    this.tourismResponse = res;
                }
            )
        } else {
            this.getTourisms();
        }

    }
}
