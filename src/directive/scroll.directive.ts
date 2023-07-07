/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[routerLink], [scrollTop]'
})
export class ScrollToTopDirective {
    @HostListener('click')
    onClick() {
        window.scrollTo(0, 0);
    }
}