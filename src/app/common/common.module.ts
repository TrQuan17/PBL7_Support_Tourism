import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

const CommonComponents = [
    SearchComponent,
    StarRatingComponent
]

@NgModule({
    declarations: [
        ...CommonComponents
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ...CommonComponents,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    bootstrap: [
        ...CommonComponents
    ]
})
export class CommonAppModule {
    public static forRoot(): ModuleWithProviders<CommonAppModule> {
        return {
            ngModule: CommonAppModule,
            providers: []
        };
    }
}
