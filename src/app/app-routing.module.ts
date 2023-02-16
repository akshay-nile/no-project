import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewManagementComponent } from './components/interview-management/interview-management.component';
import { AlphabetMultiselectionComponent } from './components/alphabet-multiselection/alphabet-multiselection.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DebounceDemoComponent } from './components/debounce-demo/debounce-demo.component';
import { VoiceRecognitionInFrontendComponent } from './components/voice-recognition-in-frontend/voice-recognition-in-frontend.component';
import { VoiceRecognitionInBackendComponent } from './components/voice-recognition-in-backend/voice-recognition-in-backend.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'speech-to-text-in-backend' },
  // { path: 'alphabet-multiselect', component: AlphabetMultiselectionComponent },
  // { path: 'interview-management', component: InterviewManagementComponent },
  // { path: 'debounce-demo', component: DebounceDemoComponent },
  { path: 'speech-to-text-in-frontend', component: VoiceRecognitionInFrontendComponent },
  { path: 'speech-to-text-in-backend', component: VoiceRecognitionInBackendComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
