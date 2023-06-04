import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthModel } from 'src/app/auth/models/auth.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Utils } from 'src/app/common/utils/utils';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() showSearchbox = true;
    @Output() searchEmitter = new EventEmitter<string>;

    public account?: AuthModel;
    public utils = Utils;

    constructor(private authService: AuthService) {}

    public getTextSearch(text: string): void {
        this.searchEmitter.emit(text);
    }

    public isCurrentAccount(): boolean {
        if(this.utils.isCurrentAccount()) {
            this.account = this.utils.isCurrentAccount();
            return true;
        }

        return false;
    }

    public logout(): void {
        this.authService.onLogout();
    }
}
