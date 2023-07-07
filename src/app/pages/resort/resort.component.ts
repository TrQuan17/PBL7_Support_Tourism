import { Component, OnInit } from '@angular/core';
import { ResortModel, ResortResponse } from 'src/app/common/models';
import { ResortService } from 'src/app/common/services';

@Component({
    selector: 'app-resort',
    templateUrl: './resort.component.html',
    styleUrls: ['./resort.component.scss']
})
export class ResortComponent implements OnInit {
    public resortResponse!: ResortResponse;
    public currentPage = 1;
    public keyWord = '';

    constructor(
        private resortService: ResortService
    ) { }

    ngOnInit(): void {
        this.getResorts();
    }

    public getResorts(): void {
        this.resortService.getResortsAndSearch(this.keyWord, this.currentPage).subscribe(
            (res: ResortResponse) => {
                this.resortResponse = res;
            }
        )
    }

    public searchResort(text: string): void {
        this.keyWord = text;
        this.getResorts();
    }

    public goPage(page: number): void {
        this.currentPage = page;
        this.getResorts();
    }

    public isDisableNext() {
        if(this.resortResponse?.status === 'SUCCESS') {
            return (this.resortResponse.data as ResortModel[]).length < 5
        }
        return true;
    }
}
