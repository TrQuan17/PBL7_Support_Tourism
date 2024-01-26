import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthProfileComponent } from './components/auth-profile/auth-profile.component';
import { ManagesComponent } from './manages.component';
import { AuthGuard } from '../core/gaurds/auth.guard';
import { ManageTourismComponent } from './components/manage-tourism/manage-tourism.component';
import { ManageResortComponent } from './components/manage-resort/manage-resort.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';

const routes: Routes = [
    {
        path: '', component: ManagesComponent, children: [
            {
                path: 'profile/me',
                component: AuthProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile/me/update',
                component: UpdateProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile/me/update/password',
                component: UpdatePasswordComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'manage/account',
                component: ManageAccountComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'manage/category',
                component: ManageCategoryComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'manage/tourism',
                component: ManageTourismComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'manage/resort',
                component: ManageResortComponent,
                canActivate: [AuthGuard]
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagesRoutingModule { }
