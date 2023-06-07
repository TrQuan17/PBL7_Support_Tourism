import { Component, OnInit } from '@angular/core';
import { AccountModel, AccountResponse } from 'src/app/common/models';
import { AccountService } from 'src/app/common/services';

@Component({
    selector: 'app-auth-profile',
    templateUrl: './auth-profile.component.html',
    styleUrls: ['./auth-profile.component.scss']
})
export class AuthProfileComponent implements OnInit{
    public accountResponse!: AccountResponse;
    public account?: AccountModel;

    constructor(
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.getAuthAccount();
    }

    public getAuthAccount(): void {
        this.accountService.getAuthAccount().subscribe(
            (res: AccountResponse) => {
                if(res.status === 'SUCCESS') {
                    this.accountResponse = res;
                    this.account = res.data as AccountModel;
                }
            }
        )
    }
}
