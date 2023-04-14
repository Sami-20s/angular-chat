import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const exportImports = [MatSlideToggleModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...exportImports],
  exports: [...exportImports],
})
export class MaterialModule {}
