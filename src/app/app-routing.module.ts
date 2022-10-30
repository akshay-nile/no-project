import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewManagementComponent } from './components/interview-management/interview-management.component';
import { AlphabetMultiselectionComponent } from './components/alphabet-multiselection/alphabet-multiselection.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'alphabet-multiselect' },
  { path: 'alphabet-multiselect', component: AlphabetMultiselectionComponent },
  { path: 'interview-management', component: InterviewManagementComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
