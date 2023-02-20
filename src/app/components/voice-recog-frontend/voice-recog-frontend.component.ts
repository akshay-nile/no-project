import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
type SpeechRecognitionStatus = 'STOPPED' | 'LISTENING' | 'PROCESSING';

@Component({
  selector: 'app-voice-recognition-in-frontend',
  templateUrl: './voice-recog-frontend.component.html'
})
export class VoiceRecogFrontendComponent implements OnInit {

  @ViewChild('mic') mic!: ElementRef;

  readonly speechRecognition = new SpeechRecognition();

  lines: string[] = [];
  status: SpeechRecognitionStatus = 'STOPPED';

  languages = environment.languages;

  constructor() { }

  ngOnInit(): void {
    this.initSpeechRecognition();
  }

  initSpeechRecognition(): void {
    this.speechRecognition.lang = 'en-IN';
    this.speechRecognition.onspeechend = () => this.mic.nativeElement.click();
    this.speechRecognition.onresult = (event: any) => {
      const lastIndex = event?.results.length - 1;
      const final = event?.results[lastIndex]?.isFinal;
      const transcript = event?.results[lastIndex][0]?.transcript;
      if (final) { this.lines[this.lines.length - 1] += transcript; }
      if (!this.status) { this.status = 'STOPPED'; }
    };
  }

  startListening(): void {
    if (this.status !== 'STOPPED') { return; }
    this.lines.push('');
    this.speechRecognition.start();
    this.status = 'LISTENING';
  }

  stopListening(): void {
    if (this.status !== 'LISTENING') { return; }
    this.status = 'PROCESSING';
    setTimeout(() => {
      this.speechRecognition.stop();
      this.status = 'STOPPED';
    }, 2000);
  }

}
