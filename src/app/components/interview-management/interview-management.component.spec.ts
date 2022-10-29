import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewManagementComponent } from './interview-management.component';

describe('InterviewManagementComponent', () => {
  let component: InterviewManagementComponent;
  let fixture: ComponentFixture<InterviewManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
