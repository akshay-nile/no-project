import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-alphabet-multiselection',
  templateUrl: './alphabet-multiselection.component.html',
  styleUrls: ['./alphabet-multiselection.component.scss']
})
export class AlphabetMultiselectionComponent implements OnInit {

  alphabetForm!: FormGroup;
  alphabets: string[] = [];
  disableAddButton: boolean = false;

  constructor(private appService: AppService) { }

  get alphabetGroups(): FormArray {
    return this.alphabetForm.get("alphabetGroups") as FormArray;
  }

  get selected(): any[] {
    return this.alphabetGroups.controls.map(control => control.get('alphabetGroup')?.value);
  }

  ngOnInit(): void {
    this.appService.getAlphabets().subscribe(alphabets => this.alphabets = alphabets);
    this.alphabetForm = new FormGroup({ 'alphabetGroups': new FormArray([]) });
    this.alphabetForm.get('alphabetGroups')?.statusChanges.subscribe(_ => this.enableOrDisableAddButton());
    this.addNewDropdown();
  }

  addNewDropdown(): void {
    this.alphabetGroups.push(new FormGroup({ alphabetGroup: new FormControl([]) }));
  }

  removeDropdownAt(removeIndex: number): void {
    this.alphabetGroups.removeAt(removeIndex);
  }

  clearDropdownAt(clearIndex: number): void {
    this.alphabetGroups.controls[clearIndex].get('alphabetGroup')?.setValue([]);
  }

  getAvailableAlphabets(ignoreIndex: number): string[] {
    const selectedAlphabets = (this.alphabetForm.get('alphabetGroups') as FormArray).controls
      .filter((_, index) => index != ignoreIndex)
      .map(control => control.get('alphabetGroup')?.value)
      .reduce((acc, group) => acc.concat(group), []);
    return this.alphabets.filter(alphabet => !selectedAlphabets.includes(alphabet));
  }

  enableOrDisableAddButton() {
    const alphabetsExausted = this.getAvailableAlphabets(-1).length == 0;
    const hasEmtpyGroup = this.selected.some(group => group.length == 0);
    this.disableAddButton = alphabetsExausted || hasEmtpyGroup;
  }
}
