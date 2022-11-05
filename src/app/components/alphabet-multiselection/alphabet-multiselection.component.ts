import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
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

  constructor(private appService: AppService, private router: Router) {
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        // store current state of selections before routing away from this component
        sessionStorage.setItem('selected', JSON.stringify(this.selected));
      }
    });
  }

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

    // restore old state of selections after routing back to this component
    const oldSelected = sessionStorage.getItem('selected');
    if (oldSelected) {
      (JSON.parse(oldSelected) as any[]).forEach(group => {
        this.addNewDropdown().get('alphabetGroup')?.setValue(group);
      });
      sessionStorage.removeItem('selected');
    } else {
      this.addNewDropdown();
    }
  }

  addNewDropdown(): FormGroup {
    const alphabetGroup = new FormGroup({ alphabetGroup: new FormControl([]) })
    this.alphabetGroups.push(alphabetGroup);
    return alphabetGroup;
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
