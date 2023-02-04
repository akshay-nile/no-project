import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphabetMultiselectionComponent } from './components/alphabet-multiselection/alphabet-multiselection.component';
import { InterviewManagementComponent } from './components/interview-management/interview-management.component';
import { PrimengModule } from './primeng.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DebounceDemoComponent } from './components/debounce-demo/debounce-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    AlphabetMultiselectionComponent,
    InterviewManagementComponent,
    PageNotFoundComponent,
    DebounceDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
