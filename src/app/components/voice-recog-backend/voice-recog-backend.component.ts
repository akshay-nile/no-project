import { Component } from '@angular/core';
import { StereoAudioRecorder } from 'recordrtc';
import { AppService } from 'src/app/services/app.service';

type SpeechRecognitionStatus = 'STOPPED' | 'RECORDING' | 'PROCESSING';

@Component({
  selector: 'app-voice-recog-backend',
  templateUrl: './voice-recog-backend.component.html'
})
export class VoiceRecogBackendComponent {

  stream!: MediaStream;
  recorder!: StereoAudioRecorder;
  timeout: any;

  lines: string[] = [];
  status: SpeechRecognitionStatus = 'STOPPED';

  languages = [
    { lang: 'English', code: 'en' },
    { lang: 'Hindi', code: 'hi' },
    { lang: 'Marathi', code: 'mr' },
    { lang: 'Telugu', code: 'te' },
    { lang: 'Tamil', code: 'ta' },
    { lang: 'Urdu', code: 'ur' }
  ];

  language = 'en';
  userId: string;

  constructor(private appService: AppService) {
    const userId = localStorage.getItem('userId')?.trim();
    if (userId) { this.userId = JSON.parse(userId); }
    else {
      this.userId = `user_${String(Math.round(Math.random() * 1000)).padStart(4, '0')}`;
      localStorage.setItem('userId', JSON.stringify(this.userId));
    }
  }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        suppressLocalAudioPlayback: true
      }
    })
      .then(stream => {
        this.stream = stream;
        this.recorder = new StereoAudioRecorder(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
          sampleRate: 44100,
          desiredSampRate: 16000,
          numberOfAudioChannels: 1,
          disableLogs: true
        });
        this.status = 'RECORDING';
        this.recorder?.record();
        this.timeout = setTimeout(() => this.stopRecording(), 15000);
      })
      .catch(console.error);
  }

  stopRecording(): void {
    if (this.status !== 'RECORDING') { return; }
    clearTimeout(this.timeout);
    this.recorder?.stop(blob => {
      console.log(Math.round(blob.size / 1024), 'KB');
      this.status = 'PROCESSING';
      this.appService.getTranscription(blob, this.userId, this.language).subscribe({
        next: text => {
          this.lines.push(text);
          this.status = 'STOPPED';
        },
        error: () => this.status = 'STOPPED'
      });
      this.stream.getAudioTracks().forEach(track => track.stop());
      this.recorder.clearRecordedData();
    });
  }

}


