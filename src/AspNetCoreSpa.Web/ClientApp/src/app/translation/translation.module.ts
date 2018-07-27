import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class TranslationModule { }
