import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';

const modules = [
  CommonModule,
  MultiSelectModule,
  ButtonModule,
  ChipModule,
  TooltipModule,
  InputTextModule,
  DropdownModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class PrimengModule { }
