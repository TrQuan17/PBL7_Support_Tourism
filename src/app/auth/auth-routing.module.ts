import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    {
        path: '', component: AuthComponent, children: [
            { path: 'login', component: LoginRegisterComponent },
            // { path: 'forgot-password', component: ForgotPaswordComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
