import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonAppModule } from '../common/common.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoginRegisterComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        CommonAppModule.forRoot()
    ]
})
export class AuthModule { }
