import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrMaskDirective } from './directives/br-mask.directive';


@NgModule({
  declarations: [
    BrMaskDirective
  ],
  exports: [
    BrMaskDirective
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class BrMaskerModule {}
