import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';
import { AccountResponse, ConfirmDialogConfig, SnackBarPanelClass } from 'src/app/common/models';
import { AccountService } from 'src/app/common/services';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
    public passwordForm!: FormGroup;
    public showPass = false;

    constructor(
        public dialog: MatDialog,
        public snackbar: MatSnackBar,
        private fb: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.checkDuplicateCurrent(this.passwordForm);
        this.checkReNewPass(this.passwordForm);
    }

    public initForm(): void {
        this.passwordForm = this.fb.group({
            current: new FormControl(null, { validators: Validators.required }),
            new: new FormControl(null, { validators: [
                Validators.required,
                Validators.pattern(/^[0-9a-zA-Z]{8,}$/)
            ] }),
            reNew: new FormControl(null, { validators: Validators.required, updateOn: 'blur' })
        })
    }

    public checkDuplicateCurrent(form: FormGroup): void {
        form.get('new')?.valueChanges.subscribe(
            value => {
                if(value === form.get('current')?.value) {
                    form.get('new')?.setErrors({'duplicate': true})
                }
            }
        )
    }

    public checkReNewPass(form: FormGroup): void {
        form.get('reNew')?.valueChanges.subscribe(
            value => {
                if (value !== form.get('new')?.value) {
                    form.get('reNew')?.setErrors({ 'noMatch': true })
                }
            }
        )
    }

    public updatePass(form: FormGroup): void {
        const pass = {
            password: form.get('current')?.value,
            newpass: form.get('new')?.value 
        }

        this.accountService.updatePassword(pass).subscribe(
            (res: AccountResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Cập nhật mật khẩu không thành công!';

                if (res.status === 'SUCCESS') {
                    message = 'Cập nhật mật khẩu thành công!';
                    snackBarPanel = SnackBarPanelClass.successClass;
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public confirmChangePass(): void {
        const dialogData: ConfirmDialogConfig = {
            type: 'update-dialog',
            header: 'Xác nhận đổi mật khẩu',
            message: 'Bạn xác nhận thay đổi mật khẩu mới ?'
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(data => {
            if(data) {
                this.updatePass(this.passwordForm);
            }
        })

        
    }
}
