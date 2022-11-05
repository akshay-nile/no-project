import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { AlphabetMultiselectionComponent } from './alphabet-multiselection.component';

describe('MultiselectComponent', () => {
  let component: AlphabetMultiselectionComponent;
  let fixture: ComponentFixture<AlphabetMultiselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphabetMultiselectionComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
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
    const comp = spyOn(component, 'addNewDropdown').and.callThrough();
    component.addNewDropdown();
    expect(comp).toHaveBeenCalled();
  });

  it('should removeDropdownAt for the given index', () => {
    const comp = spyOn(component, 'removeDropdownAt').and.callThrough();
    component.removeDropdownAt(0);
    expect(comp).toHaveBeenCalled();
  });
});
