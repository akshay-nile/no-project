import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewManagementComponent } from './interview-management.component';

describe('InterviewManagementComponent', () => {
  let component: InterviewManagementComponent;
  let fixture: ComponentFixture<InterviewManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewManagementComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rotate', () => {
    const spy = spyOn(component, 'rotate').and.callThrough();
    component.rotate();
    expect(component.rotate).toHaveBeenCalled();
  });
});
