import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ToastrComponent } from './toast.component';
import {
  DefaultNoComponentGlobalConfig,
  GlobalConfig,
  TOAST_CONFIG,
} from './toastr-config';

export const DefaultGlobalConfig: GlobalConfig = {
  ...DefaultNoComponentGlobalConfig,
  toastComponent: ToastrComponent,
};

@NgModule({
  imports: [CommonModule],
  declarations: [ToastrComponent],
  exports: [ToastrComponent],
  entryComponents: [ToastrComponent],
})
export class ToastrModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders {
    return {
      ngModule: ToastrModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultGlobalConfig,
            config,
          },
        },
      ],
    };
  }
}

@NgModule({
  imports: [CommonModule],
})
export class ToastrComponentlessModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders {
    return {
      ngModule: ToastrModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultNoComponentGlobalConfig,
            config,
          },
        },
      ],
    };
  }
}

export * from './toastr.service';
export * from './toastr-config';
