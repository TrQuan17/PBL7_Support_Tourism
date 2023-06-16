import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourismComponent } from './tourism/tourism.component';
import { DetailTourismComponent } from './detail-tourism/detail-tourism.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

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
