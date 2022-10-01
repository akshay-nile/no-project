import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MultiselectComponent } from './multiselect.component';

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectComponent ],
      providers: [FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectComponent);
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
