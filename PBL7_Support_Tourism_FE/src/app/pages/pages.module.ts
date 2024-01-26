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
import { FavouriteModule } from './favourite/favourite.module';
import { DetailTripComponent } from './detail-trip/detail-trip.component';

@NgModule({
    declarations: [
    DetailTripComponent
  ],
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
        ProfileModule,
        FavouriteModule

    ]
})
export class PagesModule { }
