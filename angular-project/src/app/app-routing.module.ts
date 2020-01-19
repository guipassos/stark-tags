import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VisitorsComponent} from './pages/visitors/visitors.component';
import {VisitorFormComponent} from './pages/visitor-form/visitor-form.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: VisitorsComponent},
  {path: 'visitor-form', component: VisitorFormComponent},
  {path: 'visitor-form/:id', component: VisitorFormComponent},
  {path: 'visitor-checkin/:id', component: VisitorFormComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
