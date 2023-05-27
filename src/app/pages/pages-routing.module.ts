import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourismComponent } from './tourism/tourism.component';
import { DetailTourismComponent } from './detail-tourism/detail-tourism.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
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
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
