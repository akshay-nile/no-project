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
  status: SpeechRecognitionStatus = 'STOPPED';
  timeout: any;

  text = '';

  languages = [
    { lang: 'English', code: 'en' },
    { lang: 'English IN', code: 'en-IN' },
    { lang: 'English US', code: 'en-US' },
    { lang: 'English UK', code: 'en-UK' }
  ];

  configs: any = {
    language: 'en-IN',
    transcriptor: 'http://127.0.0.1:5000/transcript'
  };

  constructor(private appService: AppService) {
    const userId = localStorage.getItem('userId')?.trim();
    if (userId) { this.configs['userId'] = JSON.parse(userId); }
    else {
      this.configs['userId'] = `user_${String(Math.round(Math.random() * 1000)).padStart(4, '0')}`;
      localStorage.setItem('userId', JSON.stringify(this.configs.userId));
    }
  }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
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
      clearTimeout(this.timeout);
      this.appService.getTranscription(blob, this.configs).subscribe({
        next: text => {
          this.text = text;
          this.status = 'STOPPED';
        },
        error: () => this.status = 'STOPPED'
      });
      this.stream.getAudioTracks().forEach(track => track.stop());
      this.recorder.clearRecordedData();
    });
  }

}


