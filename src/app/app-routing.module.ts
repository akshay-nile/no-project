import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewManagementComponent } from './components/interview-management/interview-management.component';
import { MultiselectComponent } from './components/multiselect/multiselect.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'multiselect' },
  { path: 'multiselect', component: MultiselectComponent },
  { path: 'interview-management', component: InterviewManagementComponent },
  { path: '**', redirectTo: 'multiselect' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
