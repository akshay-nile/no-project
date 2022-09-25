import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  formGroup!: FormGroup;
  alphabets: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  get dropdowns(): FormArray {
    return this.formGroup.get('dropdowns') as FormArray;
  }

  get selected(): string[] {
    let alphas = this.dropdowns.controls.map(dd => dd.value.alphabet);
    return alphas.concat(this.dropdowns.controls.map(dd => dd.value.number));
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      dropdowns: this.formBuilder.array([])
    });

    this.appService.getAlphabets().subscribe(alphabets => {
      this.alphabets = alphabets;
    });
  }

  getAvailableAlphabets(selfIndex: number): string[] {
    let ignoreList = this.selected.filter((a, i) => a && i != selfIndex);
    return this.alphabets.filter(a => !ignoreList.includes(a));
  }

  addNewDropdown(): void {
    this.dropdowns.push(this.formBuilder.group({
      alphabet: this.formBuilder.control(''),
      number: this.formBuilder.control('')
    }));
  }

  removeDropdownAt(i: number): void {
    this.dropdowns.removeAt(i);
  }

}
