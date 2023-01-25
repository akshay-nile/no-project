import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clock-printer',
  templateUrl: './clock-printer.component.html',
  styleUrls: ['./clock-printer.component.scss']
})
export class ClockPrinterComponent {

  @ViewChild('clock') clock!: ElementRef;

  printout = 'NONE';
  timer = new Subject<{delay: number, char: string}>();

  constructor() {
    this.timer.subscribe(v => {
      console.log(v);

      this.rotateClock(v.delay);
      this.printout += v.char;
    });
  }

  getPrintingDelay(a: string, b: string): number {
    const clockwiseDelay = Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
    const antiClockwiseDelay = 26 - clockwiseDelay;
    return (clockwiseDelay < antiClockwiseDelay) ? -clockwiseDelay : antiClockwiseDelay;
  }

  startPrinting(word: string): void {
    const arr = [{ delay: 0, char: '' }];
    this.printout = '';
    let a = 'A';
    for (let b of word) {
      let delay = this.getPrintingDelay(a, b);
      arr.push({ delay, char: b });
      a = b;
    }
    console.log(arr);
    let timeline = 0;
    for (let i = 0; i < arr.length; i++) {
      timeline += Math.abs(arr[i].delay)*1000;
      setTimeout(() => {
        if(arr[i+1]) this.timer.next(arr[i+1]);
      }, timeline);
    }
  }

  rotateClock(delay: number) {
    const clock = this.clock.nativeElement.style;
    clock.transition = `all ${Math.abs(delay)}s`;
    clock.transform = `rotate(${delay / 26}turn)`;
  }

}
