import { Component } from '@angular/core';
import { ResortResponse, TourismResponse } from 'src/app/common/models';
import { ResortService, TourismService } from 'src/app/common/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public tourismsRecommend!: TourismResponse;
    public resortsRecommend!: ResortResponse;

    constructor(
        private tourismService: TourismService,
        private resortService: ResortService
    ) {
        this.getTourismsRecommend();
        this.getResortsRecommend();
    }

    public getTourismsRecommend(): void {
        this.tourismService.getTourismsAndSearch().subscribe(
            (res: TourismResponse) => {
                this.tourismsRecommend = res;
            }
        )
    }

    public getResortsRecommend(): void {
        this.resortService.getResortsAndSearch().subscribe(
            (res: ResortResponse) => {
                this.resortsRecommend = res;
            }
        )
    }
}
