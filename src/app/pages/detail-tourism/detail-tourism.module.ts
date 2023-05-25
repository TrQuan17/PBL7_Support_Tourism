import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './components/detail/detail.component';
import { DetailTourismComponent } from './detail-tourism.component';
import { CommonAppModule } from 'src/app/common/common.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ReviewsComponent } from './components/reviews/reviews.component';

@NgModule({
  declarations: [
    DetailComponent,
    DetailTourismComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CommonAppModule.forRoot()
  ]
})
export class DetailTourismModule { }
