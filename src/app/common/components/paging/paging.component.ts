import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.scss']
})
export class PagingComponent {
    @Input() currentPage = 1;
    @Input() disableNext = false;
    @Input() noScroll = false;
    @Output() pageEmitter = new EventEmitter<number>;

    public previousPage(): void {
        this.pageEmitter.emit(this.currentPage > 1 ? this.currentPage - 1 : 1);
    }
    
    public nextPage(): void {
        this.pageEmitter.emit(this.currentPage + 1);
    }
}
