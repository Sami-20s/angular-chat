import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorViewerComponent } from './components/error-viewer/error-viewer.component';

const imports = [MaterialModule, ReactiveFormsModule, FormsModule];
const declarations = [ErrorViewerComponent];
@NgModule({
  declarations: [...declarations],
  imports: [CommonModule, ...imports],
  exports: [...imports, ...declarations],
})
export class SharedModule {}
FormsModule;
