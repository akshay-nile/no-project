import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/app.service';

import { VoiceRecognitionInBackendComponent } from './voice-recognition-in-backend.component';

describe('VoiceRecognitionInBackendComponent', () => {
  let component: VoiceRecognitionInBackendComponent;
  let fixture: ComponentFixture<VoiceRecognitionInBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceRecognitionInBackendComponent],
      imports: [HttpClientModule],
      providers: [AppService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceRecognitionInBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
