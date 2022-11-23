import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

const modules = [
  CommonModule,
  MultiSelectModule,
  ButtonModule,
  ChipModule,
  TooltipModule,
  InputTextModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class PrimengModule { }
