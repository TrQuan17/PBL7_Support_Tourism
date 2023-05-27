import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CommonAppModule } from 'src/app/common/common.module';
import { TourismRecommendComponent } from './components/tourism-recommend/tourism-recommend.component';

@NgModule({
    declarations: [
        HomeComponent,
        TourismRecommendComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        CommonAppModule.forRoot()
    ]
})
export class HomeModule { }
