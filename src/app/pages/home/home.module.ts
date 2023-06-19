import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CommonAppModule } from 'src/app/common/common.module';
import { RecommendComponent } from './components/recommend/recommend.component';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { DataWithSearchComponent } from './components/data-with-search/data-with-search.component';

@NgModule({
    declarations: [
        HomeComponent,
        RecommendComponent,
        SearchHomeComponent,
        DataWithSearchComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        CommonAppModule.forRoot()
    ]
})
export class HomeModule { }
