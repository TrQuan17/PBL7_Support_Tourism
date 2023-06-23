/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[routerLink]'
})
export class ScrollToTopDirective {
    @HostListener('click')
    onClick() {
        console.log('heloo');
        window.scrollTo(0, 0);
    }
}