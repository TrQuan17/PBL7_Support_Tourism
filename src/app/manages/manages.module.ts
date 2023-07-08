import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthProfileComponent } from './components/auth-profile/auth-profile.component';
import { ManagesComponent } from './manages.component';
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '../common/common.module';
import { LayoutModule } from '../layout/layout.module';
import { ManagesRoutingModule } from './manages-routing.module';
import { ManageTourismComponent } from './components/manage-tourism/manage-tourism.component';
import { ManageTourismDialogComponent } from './components/manage-tourism-dialog/manage-tourism-dialog.component';
import { ManageResortComponent } from './components/manage-resort/manage-resort.component';
import { ManageResortDialogComponent } from './components/manage-resort-dialog/manage-resort-dialog.component';
import { ManageServiceDialogComponent } from './components/manage-service-dialog/manage-service-dialog.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ManageRoomDialogComponent } from './components/manage-room-dialog/manage-room-dialog.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { ManageCategoryDialogComponent } from './components/manage-category-dialog/manage-category-dialog.component';
import { ManageActionResortDialogComponent } from './components/manage-action-resort-dialog/manage-action-resort-dialog.component';

@NgModule({
    declarations: [
        AuthProfileComponent,
        ManagesComponent,
        ManageTourismComponent,
        ManageTourismDialogComponent,
        ManageResortComponent,
        ManageResortDialogComponent,
        ManageServiceDialogComponent,
        UpdateProfileComponent,
        ManageAccountComponent,
        UpdatePasswordComponent,
        ManageRoomDialogComponent,
        ManageCategoryComponent,
        ManageCategoryDialogComponent,
        ManageActionResortDialogComponent
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
