import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-requires-login-dialog',
    templateUrl: './requires-login-dialog.component.html',
    styleUrls: ['./requires-login-dialog.component.scss']
})
export class RequiresLoginDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public notify: string
    ) { }
}
