import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourismComponent } from './tourism/tourism.component';
import { DetailTourismComponent } from './detail-tourism/detail-tourism.component';

const routes: Routes = [
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
