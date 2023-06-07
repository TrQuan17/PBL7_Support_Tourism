import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthProfileComponent } from './components/auth-profile/auth-profile.component';
import { ManagesComponent } from './manages.component';
import { AuthGuard } from '../core/gaurds/auth.guard';

const routes: Routes = [
    {
        path: '', component: ManagesComponent, children: [
            { 
                path: 'account/me', 
                component: AuthProfileComponent, 
                canActivate: [AuthGuard] 
            },
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagesRoutingModule { }
