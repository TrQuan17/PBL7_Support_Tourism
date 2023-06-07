import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountModel, AccountResponse } from 'src/app/common/models';
import { AccountService } from 'src/app/common/services';
import { Utils } from 'src/app/common/utils/utils';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    public utils = Utils;
    public accountId: string;
    public accountResponse!: AccountResponse;
    public account?: AccountModel;

    constructor(
        private router: ActivatedRoute,
        private accountService: AccountService
    ) {
        this.accountId = this.router.snapshot.paramMap.get('accountId') as string;
    }

    ngOnInit(): void {
        this.getAccount();
    }

    public getAccount(): void {
        this.accountService.getAccountGuest(this.accountId).subscribe(
            (res: AccountResponse) => {
                if(res.status === 'SUCCESS') {
                    this.accountResponse = res;
                    this.account = res.data as AccountModel;
                }
            }
        )
    }
}
