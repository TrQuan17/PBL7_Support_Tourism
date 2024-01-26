/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthModel } from 'src/app/auth/models/auth.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackBarPanelClass } from 'src/app/common/models';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        public snackbar: MatSnackBar,
        private router: Router
    ) { }

    public showRequireLogin(): void {
        const message = 'Vui lòng đăng nhập để thực hiện!';
        const snackBarPanel = SnackBarPanelClass.errorClass;
        SNACK_BAR_CONFIG.panelClass = snackBarPanel;
        this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const jsonStr = localStorage.getItem('account');
        if (jsonStr !== null) {
            const account = JSON.parse(jsonStr) as AuthModel;
            if (new Date().getTime() > account.expiresIn) {
                localStorage.removeItem('account');

               this.showRequireLogin();
                this.router.navigate(['login']);
            }
        }
        else {
            this.showRequireLogin();
            this.router.navigate(['login']);
        }

        return true;
    }

}
