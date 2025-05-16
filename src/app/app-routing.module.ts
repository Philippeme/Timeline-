import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelinezComponent } from './timelinez/timelinez.component';

const routes: Routes = [
  { path: 'timelinez', component: TimelinezComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
