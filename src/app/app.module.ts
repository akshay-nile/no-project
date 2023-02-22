import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphabetMultiselectionComponent } from './components/alphabet-multiselection/alphabet-multiselection.component';
import { DebounceDemoComponent } from './components/debounce-demo/debounce-demo.component';
import { InterviewManagementComponent } from './components/interview-management/interview-management.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VoiceRecogBackendComponent } from './components/voice-recog-backend/voice-recog-backend.component';
import { VoiceRecogFrontendComponent } from './components/voice-recog-frontend/voice-recog-frontend.component';
import { PrimengModule } from './primeng.module';

@NgModule({
  declarations: [
    AppComponent,
    AlphabetMultiselectionComponent,
    InterviewManagementComponent,
    PageNotFoundComponent,
    DebounceDemoComponent,
    VoiceRecogFrontendComponent,
    VoiceRecogBackendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
