import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { LayoutModule } from '../layout/layout.module';
import { CommonAppModule } from '../common/common.module';
import { TourismModule } from './tourism/tourism.module';
import { DetailTourismModule } from './detail-tourism/detail-tourism.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { ResortModule } from './resort/resort.module';
import { DetailResortModule } from './detail-resort/detail-resort.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LayoutModule,
        ClipboardModule,
        CommonAppModule.forRoot(),

        HomeModule,
        TourismModule,
        DetailTourismModule,
        ResortModule,
        DetailResortModule,
        ProfileModule

    ]
})
export class PagesModule { }
