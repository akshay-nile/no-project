import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewManagementComponent } from './components/interview-management/interview-management.component';
import { AlphabetMultiselectionComponent } from './components/alphabet-multiselection/alphabet-multiselection.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DebounceDemoComponent } from './components/debounce-demo/debounce-demo.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'alphabet-multiselect' },
  { path: 'alphabet-multiselect', component: AlphabetMultiselectionComponent },
  { path: 'interview-management', component: InterviewManagementComponent },
  { path: 'debounce-demo', component: DebounceDemoComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
