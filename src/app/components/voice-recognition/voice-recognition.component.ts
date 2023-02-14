import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
type SpeechRecognitionStatus = 'STOPPED' | 'LISTENING' | 'PROCESSING';

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.scss']
})
export class VoiceRecognitionComponent implements OnInit {

  @ViewChild('mic') mic!: ElementRef;

  readonly speechRecognition = new SpeechRecognition();

  lines: string[] = [];
  status: SpeechRecognitionStatus = 'STOPPED';

  languages = [
    { lang: 'English', code: 'en-IN' },
    { lang: 'Hindi', code: 'hi-IN' },
    { lang: 'Marathi', code: 'mr-IN' },
    { lang: 'Telugu', code: 'te-IN' },
    { lang: 'Tamil', code: 'ta-IN' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initSpeechRecognition();
  }

  initSpeechRecognition(): void {
    this.speechRecognition.lang = 'en';
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
