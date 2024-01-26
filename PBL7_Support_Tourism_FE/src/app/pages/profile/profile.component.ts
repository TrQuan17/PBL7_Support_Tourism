import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountModel, AccountResponse, PostResponse } from 'src/app/common/models';
import { AccountService, PostService } from 'src/app/common/services';
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
    public postResponse!: PostResponse;
    public account?: AccountModel;
    public currentPage = 1;
    public sort = 'desc';

    constructor(
        private router: ActivatedRoute,
        private postService: PostService,
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

                    this.getPostsByAccount(this.account._id as string);
                }
            }
        )
    }

    public getPostsByAccount(accountId: string): void {
        this.postService.getPostsByAccount(accountId, this.currentPage, this.sort).subscribe(
            (res: PostResponse) => {
                if(res.status === 'SUCCESS') {
                    this.postResponse = res;
                }
            }
        )
    }

    public sortPost(sort: string): void {
        this.sort = sort;
        this.currentPage = 1;
        this.getPostsByAccount(this.accountId);
    }

    public morePost(): void {
        this.currentPage = this.currentPage + 1;
        this.getPostsByAccount(this.accountId);
    }
}
