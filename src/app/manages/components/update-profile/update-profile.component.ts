import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AccountModel, AccountResponse, SnackBarPanelClass } from 'src/app/common/models';
import { AccountService } from 'src/app/common/services';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
    public account?: AccountModel;
    public accountForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        public snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getAuthAccount();
    }

    public getAuthAccount(): void {
        this.accountService.getAuthAccount().subscribe(
            (res: AccountResponse) => {
                if (res.status === 'SUCCESS') {
                    this.account = res.data as AccountModel;
                    this.initForm(this.account);
                }
            }
        )
    }

    public initForm(account?: AccountModel): void {
        const fullName = account?.fullname as string;
        const spaceIndex = fullName.lastIndexOf(' ');

        const firstName = fullName.substring(spaceIndex + 1);
        const lastName = fullName.substring(0, spaceIndex);

        this.accountForm = this.fb.group({
            id: new FormControl(account?._id),
            firstName: new FormControl(firstName, { validators: Validators.required }),
            lastName: new FormControl(lastName, { validators: Validators.required }),
            address: new FormControl(account?.address, { validators: Validators.required }),
            phone: new FormControl(account?.phone, {
                validators: [Validators.required, Validators.pattern(/^0\d{9}$/)]
            }),
            birthday: new FormControl(account?.birthday, { validators: Validators.required })
        })
    }

    public resetForm(): void {
        this.initForm(this.account);
    }

    public updateInfo(): void {
        const fullName = `${this.accountForm.get('lastName')?.value} `
            + `${this.accountForm.get('firstName')?.value}`

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const account: any = {
            _id: this.accountForm.get('id')?.value,
            fullname: fullName,
            address: this.accountForm.get('address')?.value,
            phone: this.accountForm.get('phone')?.value,
            birthday: this.accountForm.get('birthday')?.value,
        }

        this.accountService.updateAccount(account).subscribe(
            (res: AccountResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Cập nhật không thành công!';

                if (res.status === 'SUCCESS') {
                    message = 'Cập nhật thành công!';
                    snackBarPanel = SnackBarPanelClass.successClass;
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }
}
