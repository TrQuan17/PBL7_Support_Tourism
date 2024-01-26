import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountModel, AccountResponse } from 'src/app/common/models';
import { AccountService } from 'src/app/common/services';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    public isOpen = false;
    public account?: AccountModel;

    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        this.getAuthAccount();
    }

    public getAuthAccount(): void {
        this.accountService.getAuthAccount().subscribe(
            (res: AccountResponse) => {
                if(res.status === 'SUCCESS') {
                    this.account = res.data as AccountModel;

                    this.isOpen = this.account.role === 'user';
                }
            }
        )
    }

    public checkRouter(): boolean {
        return ['/profile/me', '/profile/me/update'].includes(this.router.url);
    }

    public isRole(router: string): boolean {
        let role: string[] = [];
        
        switch(router) {
            case 'admin':
                role = ['admin']
                break;
            case 'tourism':
                role = ['admin', 'tourism_manager'];
                break;
            case 'resort':
                role = ['admin', 'tourism_manager', 'resort_manager'];
                break;
        }

        return role.includes(this.account?.role as string);
    }

    public toggleDropdown(): void {
        this.isOpen = !this.isOpen;
    }
}
