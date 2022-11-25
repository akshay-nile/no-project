import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { MultiSelect } from 'primeng/multiselect';
import { AppService } from 'src/app/services/app.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-alphabet-multiselection',
  templateUrl: './alphabet-multiselection.component.html',
  styleUrls: ['./alphabet-multiselection.component.scss']
})
export class AlphabetMultiselectionComponent implements OnInit {

  @ViewChildren('dropdowns') dropdowns = new QueryList<MultiSelect>();

  alphabetForm!: FormGroup;
  alphabets: string[] = [];
  disableAddButton: boolean = false;

  highlightGroup = { index: -1, event: 'NONE' };
  eventClasses: any = {
    'NONE': 'bg-primary text-white',
    'EDIT': 'bg-warning text-dark',
    'DELETE': 'bg-danger text-white',
    'HOVER': 'bg-primary text-warning'
  };

  constructor(
    private appService: AppService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        // store current state of selections before routing away from this component
        this.utilityService.storeState(this, ['selected']);
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
    if (this.utilityService.stateExists(this)) {
      this.utilityService.getProperty('selected', this).forEach((group: any) => {
        this.addNewDropdown().get('alphabetGroup')?.setValue(group)
      });
      this.utilityService.clearState(this);
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

  enableOrDisableAddButton(): void {
    const alphabetsExausted = this.getAvailableAlphabets(-1).length == 0;
    const hasEmtpyGroup = this.selected.some(group => group.length == 0);
    this.disableAddButton = alphabetsExausted || hasEmtpyGroup;
  }

  setDropdownFocusAndHighlightText(index: number, focused: boolean) {
    const dropdown = this.dropdowns.get(index);
    dropdown && (dropdown.focus = focused);
    this.highlightGroup = focused ? { index, event: 'HOVER' } : { index: -1, event: 'NONE' };
  }
}
