import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CommonAppModule } from 'src/app/common/common.module';
import { RecommendComponent } from './components/recommend/recommend.component';

@NgModule({
    declarations: [
        HomeComponent,
        RecommendComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        CommonAppModule.forRoot()
    ]
})
export class HomeModule { }
