import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ExportItems } from './exports.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ExportItems
  ],
  exports: [
    ExportItems
  ]
})
export class SharedExportModule { }