import { Component, OnInit } from '@angular/core';
import { StereoAudioRecorder } from 'recordrtc';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

type SpeechRecognitionStatus = 'STOPPED' | 'LISTENING' | 'PROCESSING';

@Component({
  selector: 'app-voice-recog-frontend',
  templateUrl: './voice-recog-backend.component.html'
})
export class VoiceRecogBackendComponent implements OnInit {

  stream!: MediaStream;
  recorder!: StereoAudioRecorder;

  lines: string[] = [];
  status: SpeechRecognitionStatus = 'STOPPED';

  languages = environment.languages;
  lang = 'en-IN';

  userId: string;

  constructor(private appService: AppService) {
    const userId = localStorage.getItem('userId');
    if (userId) { this.userId = JSON.parse(userId); }
    else {
      this.userId = `user_${Math.round(Math.random() * 1000)}@email.com`;
      localStorage.setItem('userId', this.userId);
    }
  }

  ngOnInit(): void { }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true } })
      .then(stream => {
        this.stream = stream;
        this.recorder = new StereoAudioRecorder(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
          sampleRate: 44100,
          numberOfAudioChannels: 1
        });
        this.status = 'LISTENING'
        this.recorder?.record();
      })
      .catch(console.error);
  }

  stopRecording(): void {
    if (this.status !== 'LISTENING') { return; }
    this.recorder?.stop((blob) => {
      console.log(Math.round(blob.size / 1024), 'KB');
      this.status = 'PROCESSING';
      this.appService.getTranscription(blob, this.userId, this.lang).subscribe({
        next: text => {
          this.lines.push(text);
          this.status = 'STOPPED';
        },
        error: () => this.status = 'STOPPED'
      });
      this.stream.getAudioTracks().forEach(track => track.stop());
    });
  }

}


