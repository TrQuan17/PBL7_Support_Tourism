import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { MaterialModule } from '../material/material.module';

const CommonComponents = [
    SearchComponent
]

@NgModule({
    declarations: [
        ...CommonComponents
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ...CommonComponents,
        MaterialModule,
        ReactiveFormsModule
    ],
    bootstrap: [
        ...CommonComponents
    ]
})
export class CommonAppModule {
    public static forRoot(): ModuleWithProviders<CommonAppModule> {
        return {
            ngModule: CommonAppModule,
            providers: []
        };
    }
}
