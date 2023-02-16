import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecognitionInFrontendComponent } from './voice-recognition-in-frontend.component';

describe('VoiceRecognitionInFrontendComponent', () => {
  let component: VoiceRecognitionInFrontendComponent;
  let fixture: ComponentFixture<VoiceRecognitionInFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceRecognitionInFrontendComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceRecognitionInFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
