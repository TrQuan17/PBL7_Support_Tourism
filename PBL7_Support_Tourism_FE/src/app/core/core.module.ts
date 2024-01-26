import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonAppModule } from '../common/common.module';
import { IconService } from './services/icon/icon.service';

@NgModule({
    imports: [
        CommonModule,
        CommonAppModule.forRoot()
    ]
})
export class CoreModule {
    public constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error('The CoreModule has been already created');
        }
    }

    public static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                IconService
            ]
        };
    }
}
