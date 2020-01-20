import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VisitorsComponent} from './pages/visitors/visitors.component';
import {VisitorFormComponent} from './pages/visitor-form/visitor-form.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {VisitorsInVisitComponent} from './pages/visitors-in-visit/visitors-in-visit.component';

const routes: Routes = [
  {path: '', component: VisitorsComponent},
  {path: 'visitor-form', component: VisitorFormComponent},
  {path: 'visitor-form/:id', component: VisitorFormComponent},
  {path: 'visitor-in-visit', component: VisitorsInVisitComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
