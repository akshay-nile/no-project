import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecognitionInFrontendComponent } from './voice-recognition-in-frontend.component';

describe('VoiceRecognitionComponent', () => {
  let component: VoiceRecognitionInFrontendComponent;
  let fixture: ComponentFixture<VoiceRecognitionInFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceRecognitionInFrontendComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceRecognitionInFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
