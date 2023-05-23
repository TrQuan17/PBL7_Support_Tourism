import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Output() searchEmitter = new EventEmitter<string>;

    public getTextSearch(text: string): void {
        this.searchEmitter.emit(text);
    }
}
