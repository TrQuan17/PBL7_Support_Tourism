import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AccountModel, AccountResponse, SnackBarPanelClass } from 'src/app/common/models';
import { PostResponse } from 'src/app/common/models/post.model';
import { AccountService, PostService } from 'src/app/common/services';

const SNACK_BAR_CONFIG = new MatSnackBarConfig();
SNACK_BAR_CONFIG.duration = 2000;
SNACK_BAR_CONFIG.verticalPosition = 'bottom';
SNACK_BAR_CONFIG.horizontalPosition = 'center';

@Component({
    selector: 'app-auth-profile',
    templateUrl: './auth-profile.component.html',
    styleUrls: ['./auth-profile.component.scss']
})
export class AuthProfileComponent implements OnInit {
    public accountResponse!: AccountResponse;
    public postResponse!: PostResponse;
    public account?: AccountModel;
    public sort = 'desc';
    public currentPage = 1;

    constructor(
        public snackbar: MatSnackBar,
        private accountService: AccountService,
        private postService: PostService
    ) { }

    ngOnInit(): void {
        this.getAuthAccount();
    }

    public getAuthAccount(): void {
        this.accountService.getAuthAccount().subscribe(
            (res: AccountResponse) => {
                if (res.status === 'SUCCESS') {
                    this.accountResponse = res;
                    this.account = res.data as AccountModel;

                    this.getPostByAccount(this.account._id as string);
                }
            }
        )
    }

    public getPostByAccount(accountId: string): void {
        this.postService.getPostsByAccount(accountId, this.currentPage, this.sort).subscribe(
            (res: PostResponse) => {
                if(res.status === 'SUCCESS') {
                    this.postResponse = res;
                }
            }
        )
    }

    public writePost(form: FormData): void {
        this.postService.createPost(form).subscribe(
            (res: PostResponse) => {
                let snackBarPanel = SnackBarPanelClass.errorClass;
                let message = 'Đăng bài viết không thành công!';

                if (res.status === 'SUCCESS') {
                    message = 'Đăng bài viết thành công!';
                    snackBarPanel = SnackBarPanelClass.successClass;
                }

                SNACK_BAR_CONFIG.panelClass = snackBarPanel;
                this.snackbar.open(message, undefined, SNACK_BAR_CONFIG);
            }
        )
    }

    public sortPost(sort: string): void {
        this.sort = sort;
        this.currentPage = 1;
        this.getAuthAccount();
    }

    public morePost(): void {
        this.currentPage = this.currentPage + 1;
        this.getAuthAccount();
    }
}
