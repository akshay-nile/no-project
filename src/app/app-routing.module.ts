import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VoiceRecogBackendComponent } from './components/voice-recog-backend/voice-recog-backend.component';
import { VoiceRecogFrontendComponent } from './components/voice-recog-frontend/voice-recog-frontend.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'speech-to-text-in-backend' },
  // { path: 'alphabet-multiselect', component: AlphabetMultiselectionComponent },
  // { path: 'interview-management', component: InterviewManagementComponent },
  // { path: 'debounce-demo', component: DebounceDemoComponent },
  { path: 'speech-to-text-in-frontend', component: VoiceRecogFrontendComponent },
  { path: 'speech-to-text-in-backend', component: VoiceRecogBackendComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
