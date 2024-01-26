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
        this.iconRegistry.addSvgIcon('icon-logout', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/power-off-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-page', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/pager-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-home', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/house-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-birthday', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/cake-candles-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-email', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/envelope-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-phone', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/phone-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-upload-file', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/upload-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-add', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/plus-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-edit', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/pen-to-square-regular.svg'));
        this.iconRegistry.addSvgIcon('icon-delete', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/trash-can-regular.svg'));
        this.iconRegistry.addSvgIcon('icon-save', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/floppy-disk-regular.svg'));
        this.iconRegistry.addSvgIcon('icon-confirm', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/check-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-account-manage', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/users-gear-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-resort-manage', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/hotel-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-tourism-manage', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/map-location-dot-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-service-manage', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/bell-concierge-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-made-reservation', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/key-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-rooms-num', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/building-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-move', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/arrows-up-down-left-right-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-trip', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/map-location-dot-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-category', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/book-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-previous', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/angle-left-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-next', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/angle-right-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-sort-down', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/sort-down-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-sort-up', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/sort-up-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-show-more', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/angles-down-solid.svg'));
        this.iconRegistry.addSvgIcon('icon-time-go', this.sanitizer.bypassSecurityTrustResourceUrl(domain + 'assets/icon-svg/plane-departure-solid.svg'));
    }
}
