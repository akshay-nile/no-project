import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip';

const modules = [
  CommonModule,
  MultiSelectModule,
  ButtonModule,
  ChipModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class PrimengModule { }
