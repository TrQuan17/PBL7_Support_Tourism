import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResortResponse, TourismResponse } from 'src/app/common/models';
import { ResortService, TourismService } from 'src/app/common/services';
import { LoadingSpinnerDialogService } from 'src/app/layout/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public tourismsRecommend!: TourismResponse;
    public resortsRecommend!: ResortResponse;
    public tourismSearch?: TourismResponse;
    public resortSearch?: ResortResponse;
    public isResetSearch = false;
    public typeSearch = '';
    public keyWord = '';

    constructor(
        private loadingDialog: LoadingSpinnerDialogService,
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

    public searchData(form: FormGroup): void {
        this.typeSearch = form.get('type')?.value;
        this.keyWord = form.get('text')?.value;

        switch(this.typeSearch) {
            case 'tourism':
                this.getTourismSearch(this.keyWord);
                this.typeSearch = 'Địa điểm du lịch';
                break;
            case 'resort':
                this.getResortSearch(this.keyWord);
                this.typeSearch = 'Khu nghỉ dưỡng';
                break;
        }
    }

    public getTourismSearch(q: string): void {
        this.tourismService.getTourismsAndSearch(q).subscribe(
            (res: TourismResponse) => {
                if(res.status === 'SUCCESS') {
                    this.tourismSearch = res;
                }
            }
        )
    }

    public getResortSearch(q: string): void {
        this.resortService.getResortsAndSearch(q).subscribe(
            (res: ResortResponse) => {
                if(res.status === 'SUCCESS') {
                    this.resortSearch = res;
                }
            }
        )
    }

    public resetSearch(): void {
       this.keyWord = '';
       this.isResetSearch = true;
    }
}
