import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourismComponent } from './tourism/tourism.component';
import { DetailTourismComponent } from './detail-tourism/detail-tourism.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ResortComponent } from './resort/resort.component';
import { DetailResortComponent } from './detail-resort/detail-resort.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AuthGuard } from '../core/gaurds/auth.guard';
import { DetailTripComponent } from './detail-trip/detail-trip.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'tourism',
        component: TourismComponent,
    },
    {
        path: 'tourism/:tourismId',
        component: DetailTourismComponent
    },
    {
        path: 'resort',
        component: ResortComponent
    },
    {
        path: 'resort/:resortId',
        component: DetailResortComponent
    },
    {
        path: 'profile/me/favourite',
        component: FavouriteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'trip/:tripId',
        component: DetailTripComponent
    },
    {
        path: 'profile/:accountId',
        component: ProfileComponent
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
