import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonAppModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

const LayoutComponents = [
    HeaderComponent,
    FooterComponent
]

@NgModule({
    declarations: [
        ...LayoutComponents
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        CommonAppModule.forRoot()
    ],
    exports: [
        ...LayoutComponents,
        FormsModule
    ]
})
export class LayoutModule { }
