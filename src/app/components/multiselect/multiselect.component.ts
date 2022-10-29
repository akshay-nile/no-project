import { Component, OnInit } from '@angular/core';
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
  disableAddNew: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  get dropdowns(): FormArray {
    return this.formGroup.get('dropdowns') as FormArray;
  }

  get selected(): any[] {
    return this.dropdowns.controls.map(dd => dd.value.alphabet);
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
    const ignoreList = this.selected.filter((a, i) => a && i != selfIndex).reduce((acc, a) => acc.concat(a), [] as string[]);
    return this.alphabets.filter(a => !ignoreList.includes(a));
  }

  addNewDropdown(): void {
    this.dropdowns.push(this.formBuilder.group({
      alphabet: this.formBuilder.control([])
    }));
    this.disableAddNew = true;
  }

  removeDropdownAt(i: number): void {
    this.dropdowns.removeAt(i);
  }

  selectionChanged(event: any, i: number): void {
    if (event === null) {
      (this.formGroup.get('dropdowns')?.value as Array<any>)[i].alphabet = [];
    } 
    
  }
}
