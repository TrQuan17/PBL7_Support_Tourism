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
        this.iconRegistry.addSvgIcon('icon-location', this.sanitizer.bypassSecurityTrustResourceUrl(domain + '/assets/icon-svg/location-dot-solid.svg'))
    }
}
