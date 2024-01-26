import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './components/detail/detail.component';
import { ServicesComponent } from './components/services/services.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CommonAppModule } from 'src/app/common/common.module';
import { DetailResortComponent } from './detail-resort.component';
import { RoomsComponent } from './components/rooms/rooms.component';



@NgModule({
    declarations: [
        DetailComponent,
        ServicesComponent,
        DetailResortComponent,
        RoomsComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        CommonAppModule.forRoot()
    ]
})
export class DetailResortModule { }
