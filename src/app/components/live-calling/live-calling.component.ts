import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-live-calling',
  templateUrl: './live-calling.component.html',
  styleUrls: ['./live-calling.component.scss']
})
export class LiveCallingComponent implements OnInit {

  @ViewChild('speaker') speaker!: ElementRef;

  username = '';

  selectedContact = '';
  availableContacts: string[] = [];

  pollingTimer = interval(1000);
  responsePending = false;

  data: any[] = [];
  recorder: MediaRecorder | undefined;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    if (document.cookie.length) { this.username = document.cookie; }

    this.pollingTimer.subscribe(() => {
      if (!this.username.length || this.responsePending) { return; }

      if (!this.recorder && this.selectedContact.length) {
        navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true } })
          .then(stream => {
            this.recorder = new MediaRecorder(stream);
            this.recorder.ondataavailable = event => {
              this.data.push(event.data);
              this.recorder?.start();
            };
            this.recorder.start();
          }).catch(console.error);
      } else { this.recorder?.stop(); }

      this.responsePending = true;
      const blob = new Blob(this.data, { type: 'audio/webm' });
      this.appService.getCallStatus(blob, this.username, this.selectedContact).subscribe({
        next: (response: any) => {
          this.availableContacts = response?.available ?? [];
          if (response?.data?.length) {
            const bytes = new Uint8Array(response.data.length);
            for (let i = 0; i < bytes.length; i++) { bytes[i] = response.data[i]; }
            const blob = new Blob([bytes], { type: 'audio/webm' });
            this.speaker.nativeElement.src = URL.createObjectURL(blob);
          }
          this.responsePending = false;
        },
        error: () => this.responsePending = false
      });
      this.data = [];
    });
  }

  setUsername(username: string): void {
    if (!username) { return; }
    username = username[0].toUpperCase() + username.substring(1).toLowerCase();
    this.username = username + '_' + Date.now();
    document.cookie = this.username;
  }
}
