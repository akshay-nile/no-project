import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  languages = [
    { lang: 'English', code: 'en' },
    { lang: 'Hindi', code: 'hi' },
    { lang: 'Marathi', code: 'mr' },
    { lang: 'Telugu', code: 'te' },
    { lang: 'Tamil', code: 'ta' },
    { lang: 'Urdu', code: 'ur' }
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
      this.speak(this.lines[this.lines.length - 1]); // speak-out the transcripted text
    }, 2000);
  }

  speak(text: string): void {
    let speakData = new SpeechSynthesisUtterance();
    speakData.rate = 0.9; // From 0 to 2
    speakData.pitch = 0.7; // From 0.1 to 10
    speakData.lang = this.speechRecognition.lang + '-IN';
    speakData.text = text;
    speechSynthesis.speak(speakData);
  }

}
