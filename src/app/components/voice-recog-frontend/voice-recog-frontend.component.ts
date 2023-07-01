import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

type SpeechRecognitionStatus = 'STOPPED' | 'LISTENING';
type Transcript = { text: string, lang: string, finished: boolean };

@Component({
  selector: 'app-voice-recognition-in-frontend',
  templateUrl: './voice-recog-frontend.component.html'
})
export class VoiceRecogFrontendComponent implements OnInit {

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
    this.speechRecognition.onspeechend = () => {
      this.stopListening();
      this.changeDetectorRef.detectChanges();
    };
    this.speechRecognition.onresult = (event: any) => {
      const lastIndex = event?.results.length - 1;
      const final = event?.results[lastIndex]?.isFinal;
      const transcript = event?.results[lastIndex][0]?.transcript;
      const i = this.lines.length - 1;
      if (final && !this.lines[i].finished) {
        this.lines[i].text += transcript;
        this.lines[i].finished = true;
        this.startSpeaking(i);
      }
      if (this.status !== 'STOPPED') { this.status = 'STOPPED'; }
      this.changeDetectorRef.detectChanges();
    };
  }

  initSpeechSynthesis(): void {
    this.speakData.rate = 0.9; // From 0 to 2
    this.speakData.pitch = 0.7; // From 0.1 to 10
    this.speakData.onend = () => {
      this.playingIndex = -1;
      this.changeDetectorRef.detectChanges();
    };
  }

  startListening(): void {
    if (this.status !== 'STOPPED') { return; }
    this.lines.push({ text: '', lang: this.speechRecognition.lang, finished: false });
    this.speechRecognition.start();
    this.status = 'LISTENING';
  }
  
  stopListening(cancel = false): void {
    if (this.status !== 'LISTENING') { return; }
    this.speechRecognition.stop();
    this.status = 'STOPPED';
    if (cancel) { this.lines.pop(); } // remove last attempt if cancelled by user's click
    else { // speak-out the transcripted text
      // setTimeout(() =>  , 1000);
    } 
  }
  
  startSpeaking(i: number): void {
    if (this.playingIndex !== -1) { this.stopSpeaking(); } // to stop if already playing
    this.speakData.lang = this.lines[i].lang + '-IN';
    this.speakData.text = this.lines[i].text;
    this.playingIndex = i;  // to change the play-button icon while playing
    speechSynthesis.speak(this.speakData);
    this.changeDetectorRef.detectChanges();
  };
  
  stopSpeaking(): void {
    this.playingIndex = -1;
    speechSynthesis.cancel();
    this.changeDetectorRef.detectChanges();
  }
}

