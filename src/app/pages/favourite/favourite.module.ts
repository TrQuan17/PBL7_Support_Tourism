import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteComponent } from './favourite.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CommonAppModule } from 'src/app/common/common.module';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CreateTripDialogComponent } from './components/create-trip-dialog/create-trip-dialog.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { TripsComponent } from './components/trips/trips.component';

@NgModule({
    declarations: [
        FavouriteComponent,
        CreateTripDialogComponent,
        FavouritesComponent,
        TripsComponent
    ],
    imports: [
        CommonModule,
        CdkDropList,
        CdkDrag,
        LayoutModule,
        CommonAppModule.forRoot()
    ]
})
export class FavouriteModule { }
