import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Role, RoleKey } from 'src/app/auth/models/auth.model';
import { ConfirmDialogComponent } from 'src/app/common/components/confirm-dialog/confirm-dialog.component';
import { AccountModel, AccountResponse, ConfirmDialogConfig, SnackBarPanelClass } from 'src/app/common/models';
import { AccountService } from 'src/app/common/services';


const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-manage-account',
    templateUrl: './manage-account.component.html',
    styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
    public displayedColumns: string[] = ['avatar', 'name', 'role', 'action'];
    public dataSource = new MatTableDataSource<AbstractControl>;
    public accountsList: AccountModel[] = [];
    public roleEnum = Role;
    public roleForm!: FormGroup;
    public roleList: RoleKey[] = ['tourism_manager', 'resort_manager', 'user'];
    public keyWord = '';
    public currentPage = 1;

    constructor(
        public dialog: MatDialog,
        public snackbar: MatSnackBar,
        private fb: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.getAccounts();
    }

    public initForm(): void {
        this.roleForm = this.fb.group({
            roleArray: this.fb.array([])
        })
    }

    public searchAccount(q: string) {
        this.keyWord = q;
        this.currentPage = 1;
        this.getAccounts();
    }

    public getAccounts(): void {
        this.accountService.getAllAccount(this.keyWord, this.currentPage).subscribe(
            (res: AccountResponse) => {
                if (res.status === 'SUCCESS') {
                    this.accountsList = res.data as AccountModel[];
                    this.createFormGroup(this.accountsList);
                    this.dataSource = new MatTableDataSource(this.dataArray.controls);
                }
            }
        )
    }

    public get dataArray(): FormArray {
        return this.roleForm.get('roleArray') as FormArray;
    }

    public createFormGroup(accounts: AccountModel[]): void {
        this.roleForm = this.fb.group({
            roleArray: this.fb.array(
                accounts ? accounts.map(value => this.convertToFormGroup(value)) : []
            )
        })
    }

    public convertToFormGroup(account?: AccountModel): FormGroup {
        return this.fb.group({
            accountId: new FormControl(account?._id),
            avatar: new FormControl(account?.avatar),
            fullname: new FormControl(account?.fullname),
            username: new FormControl(account?.username),
            role: new FormControl(account?.role)
        })
    }

    public changeRole(form: FormGroup): void {
        const role = {
            _id: form.get('accountId')?.value,
            role: form.get('role')?.value
        }

        const dialogData: ConfirmDialogConfig = {
            type: 'update-dialog',
            header: 'Xác nhận thay đổi quyền',
            message: `Bạn xác nhận thay đổi quyền của người dùng @${form.get('username')?.value} ?`,
            image: form.get('avatar')?.value
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30vw',
            disableClose: true,
            data: dialogData
        })

        dialogRef.afterClosed().subscribe(data => {
            if(data) {
                this.accountService.updateAccount(role).subscribe(
                    (res: AccountResponse) => {
                        let snackBarPanel = SnackBarPanelClass.errorClass;
                        let message = 'Thay đổi quyền quản trị không thành công!';
        
                        if (res.status === 'SUCCESS') {
                            message = 'Thay đổi quyền quản trị thành công!';
                            snackBarPanel = SnackBarPanelClass.successClass;
        
                            this.getAccounts();
                        }
        
                        SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                        this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
                    }
                )
            }
        })
    }

    public goPage(page: number): void {
        this.currentPage = page;
        this.getAccounts();
    }
}
