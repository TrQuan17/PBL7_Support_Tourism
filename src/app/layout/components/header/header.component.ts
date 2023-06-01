import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() showSearchbox = true;
    @Output() searchEmitter = new EventEmitter<string>;

    public account = {
        fullname: '',
        avatar: '',
        token: ''
    }

    constructor(private authService: AuthService) {}

    public getTextSearch(text: string): void {
        this.searchEmitter.emit(text);
    }

    public isCurrentAccount(): boolean {
        if(localStorage.getItem('account') !== null) {
            this.account = JSON.parse(localStorage.getItem('account') as string)
            
            if(this.account.token) return true;
        }

        return false;
    }

    public logout(): void {
        this.authService.onLogout();
    }
}
