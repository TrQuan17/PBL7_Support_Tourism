import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { RequiresLoginDialogComponent } from './components/requires-login-dialog/requires-login-dialog.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from './models';
import { ScrollToTopDirective } from 'src/directive/scroll.directive';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { WriteReviewDialogComponent } from './components/write-review-dialog/write-review-dialog.component';
import { PagingComponent } from './components/paging/paging.component';

const CommonComponents = [
    SearchComponent,
    StarRatingComponent,
    RequiresLoginDialogComponent,
    ConfirmDialogComponent,
    TimelineComponent,
    ReviewsComponent,
    WriteReviewDialogComponent,
    PagingComponent
]

const CommonDirective = [
    ScrollToTopDirective
]

@NgModule({
    declarations: [
        ...CommonComponents,
        ...CommonDirective
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        ...CommonComponents,
        ...CommonDirective,
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
            providers: [
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
            ]
        };
    }
}
