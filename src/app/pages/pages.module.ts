import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CommonAppModule } from '../common/common.module';
import { TourismModule } from './tourism/tourism.module';
import { DetailTourismModule } from './detail-tourism/detail-tourism.module';
import { HomeModule } from './home/home.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LayoutModule,
        CommonAppModule.forRoot(),

        HomeModule,
        TourismModule,
        DetailTourismModule

    ]
})
export class PagesModule { }
