import { NgModule } from '@angular/core';

import { TranslatePipe } from './pipes';

@NgModule({
  imports: [
  ],
  exports: [
    TranslatePipe
  ],
  declarations: [
    TranslatePipe
  ],
  providers: [],
})
export class AppSharedModule { }

export * from './pipes';
