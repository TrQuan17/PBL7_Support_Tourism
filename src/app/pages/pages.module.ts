import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { CommonAppModule } from '../common/common.module';
import { TourismModule } from './tourism/tourism.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    CommonAppModule.forRoot(),

    TourismModule
  ]
})
export class PagesModule { }
