import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { env } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class IconService {
    public constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platformId: string
    ) { }

    public init(): void {

        const domain = (isPlatformServer(this.platformId)) ? env.HOME_PAGE : '';

        this.iconRegistry.addSvgIcon('icon-search', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/search_black.svg'));
        this.iconRegistry.addSvgIcon('icon-shopping-cart', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/shopping_cart_black.svg'));
        this.iconRegistry.addSvgIcon('icon-heart-like', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/heart-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-heart-unlike', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/heart-regular.svg'));
        this.iconRegistry.addSvgIcon('icon-share', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/share-nodes-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-location', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/location-dot-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-write', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/keyboard-regular.svg'));
        this.iconRegistry.addSvgIcon('icon-close', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/xmark-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-send', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/paper-plane-regular.svg'));
        this.iconRegistry.addSvgIcon('icon-user', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/user-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-show-pass', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/eye-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-hidden-pass', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/eye-slash-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-menu-bars', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/bars-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-logout', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/right-from-bracket-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-page', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/pager-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-home', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/house-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-birthday', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/cake-candles-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-email', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/envelope-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-phone', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/phone-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-upload-file', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/upload-solid.svg'));
    }
}
