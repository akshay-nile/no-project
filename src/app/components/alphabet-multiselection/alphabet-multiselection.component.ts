import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { AppService } from 'src/app/services/app.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-alphabet-multiselection',
  templateUrl: './alphabet-multiselection.component.html',
  styleUrls: ['./alphabet-multiselection.component.scss']
})
export class AlphabetMultiselectionComponent implements OnInit, OnDestroy {

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

  backupKey = 'AlphabetMultiselectionComponent';

  constructor(
    private appService: AppService,
    private utilityService: UtilityService
  ) { }

  get alphabetGroups(): FormArray {
    return this.alphabetForm.get("alphabetGroups") as FormArray;
  }

  get selected(): any[] {
    return this.alphabetGroups.controls.map(control => control.get('alphabetGroup')?.value);
  }

  ngOnInit(): void {
    this.alphabetForm = new FormGroup({ 'alphabetGroups': new FormArray([]) });

    // restore old state after routing back to this component or else init with defaults
    if (this.utilityService.stateExists(this)) {
      this.alphabets = this.utilityService.getProperty(this, 'alphabets');
      const selected = this.utilityService.getProperty(this, 'selected');
      selected.forEach((group: any) => this.addNewDropdown().get('alphabetGroup')?.setValue(group));
      this.utilityService.clearState(this);
    } else {
      this.appService.getAlphabets().subscribe(alphabets => this.alphabets = alphabets);
      this.addNewDropdown();
    }

    this.alphabetForm.get('alphabetGroups')?.statusChanges.subscribe(_ => this.enableOrDisableAddButton());
  }

  ngOnDestroy(): void {
    // store current states before routing away from this component
    this.utilityService.storeState(this, ['alphabets', 'selected']);
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
