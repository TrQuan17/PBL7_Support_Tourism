import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourismComponent } from './tourism.component';
import { CommonAppModule } from 'src/app/common/common.module';
import { ShowComponent } from './components/show/show.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [
    ShowComponent,
    TourismComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CommonAppModule.forRoot()
  ]
})
export class TourismModule { }
