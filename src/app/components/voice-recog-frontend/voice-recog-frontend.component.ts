import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

type SpeechRecognitionStatus = 'STOPPED' | 'LISTENING' | 'PROCESSING';
type Transcript = { text: string, lang: string };

@Component({
  selector: 'app-voice-recognition-in-frontend',
  templateUrl: './voice-recog-frontend.component.html'
})
export class VoiceRecogFrontendComponent implements OnInit {

  @ViewChild('mic') mic!: ElementRef;

  readonly speechRecognition = new SpeechRecognition();
  readonly speakData = new SpeechSynthesisUtterance();

  lines: Transcript[] = [];
  status: SpeechRecognitionStatus = 'STOPPED';

  playingIndex = -1;

  languages = [
    { lang: 'English', code: 'en' },
    { lang: 'Hindi', code: 'hi' },
    { lang: 'Marathi', code: 'mr' },
    { lang: 'Telugu', code: 'te' },
    { lang: 'Tamil', code: 'ta' },
    { lang: 'Urdu', code: 'ur' }
  ];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initSpeechRecognition();
    this.initSpeechSynthesis();
  }

  initSpeechRecognition(): void {
    this.speechRecognition.lang = 'en';
    this.speechRecognition.onspeechend = () => this.mic.nativeElement.click();
    this.speechRecognition.onresult = (event: any) => {
      const lastIndex = event?.results.length - 1;
      const final = event?.results[lastIndex]?.isFinal;
      const transcript = event?.results[lastIndex][0]?.transcript;
      if (final) { this.lines[this.lines.length - 1].text += transcript; }
      if (!this.status) { this.status = 'STOPPED'; }
    };
  }

  initSpeechSynthesis(): void {
    this.speakData.rate = 0.9; // From 0 to 2
    this.speakData.pitch = 0.7; // From 0.1 to 10
    this.speakData.onend = () => {
      this.playingIndex = -1;
      this.changeDetectorRef.detectChanges(); // to refresh UI for variable value changes
    };
  }

  startListening(): void {
    if (this.status !== 'STOPPED') { return; }
    this.lines.push({ text: '', lang: this.speechRecognition.lang });
    this.speechRecognition.start();
    this.status = 'LISTENING';
  }

  stopListening(): void {
    if (this.status !== 'LISTENING') { return; }
    this.status = 'PROCESSING';
    setTimeout(() => {
      this.speechRecognition.stop();
      this.status = 'STOPPED';
      this.startSpeaking(this.lines.length - 1); // speak-out the transcripted text
    }, 2000);
  }

  startSpeaking(i: number): void {
    if (this.playingIndex !== -1) { this.stopSpeaking(); } // to stop if already playing
    this.speakData.lang = this.lines[i].lang + '-IN';
    this.speakData.text = this.lines[i].text;
    this.playingIndex = i;  // to change the play-button icon while playing
    speechSynthesis.speak(this.speakData);
  };

  stopSpeaking(): void {
    this.playingIndex = -1;
    speechSynthesis.cancel();
  }
}

