import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CommonAppModule } from 'src/app/common/common.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CommonAppModule.forRoot()
  ]
})
export class ProfileModule { }
