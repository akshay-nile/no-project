import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilityService } from 'src/app/services/utility.service';

import { AlphabetMultiselectionComponent } from './alphabet-multiselection.component';

describe('MultiselectComponent', () => {
  let component: AlphabetMultiselectionComponent;
  let fixture: ComponentFixture<AlphabetMultiselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphabetMultiselectionComponent],
      imports: [RouterTestingModule],
      providers: [FormBuilder, UtilityService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetMultiselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getAvailableAlphabets for the given index', () => {
    const comp = spyOn(component, 'getAvailableAlphabets').and.callThrough();
    component.getAvailableAlphabets(0);
    expect(comp).toHaveBeenCalled();
  });

  it('should addNewDropdown', () => {
    const spy = spyOn(component, 'addNewDropdown').and.callThrough();
    component.addNewDropdown();
    expect(spy).toHaveBeenCalled();
  });

  it('should removeDropdownAt for the given index', () => {
    const spy = spyOn(component, 'removeDropdownAt').and.callThrough();
    component.removeDropdownAt(0);
    expect(spy).toHaveBeenCalled();
  });

  it('should clearDropdownAt for the given index', () => {
    const spy = spyOn(component, 'clearDropdownAt').and.callThrough();
    component.clearDropdownAt(0);
    expect(spy).toHaveBeenCalled();
  });

  it('should call through setDropdownFocusAndHighlightText', () => {
    const spy = spyOn(component, 'setDropdownFocusAndHighlightText').and.callThrough();
    component.setDropdownFocusAndHighlightText(0, false);
    expect(spy).toHaveBeenCalled();
  });

  it('should restore old selections from UtilityService', () => {
    const utilityService = TestBed.inject(UtilityService);
    utilityService.states.set(component.selectionState, [[]]);

    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
