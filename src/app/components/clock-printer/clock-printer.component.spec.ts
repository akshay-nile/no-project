import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockPrinterComponent } from './clock-printer.component';

describe('ClockPrinterComponent', () => {
  let component: ClockPrinterComponent;
  let fixture: ComponentFixture<ClockPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockPrinterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
