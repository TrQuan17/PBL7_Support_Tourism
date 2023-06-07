import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthProfileComponent } from './components/auth-profile/auth-profile.component';
import { ManagesComponent } from './manages.component';
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '../common/common.module';
import { LayoutModule } from '../layout/layout.module';
import { ManagesRoutingModule } from './manages-routing.module';

@NgModule({
  declarations: [
    AuthProfileComponent,
    ManagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    ManagesRoutingModule,
    CommonAppModule.forRoot()
  ]
})
export class ManagesModule { }
