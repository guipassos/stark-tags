import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgxLoaderIndicatorModule} from 'ngx-loader-indicator';
import {NgxLocalStorageModule} from 'ngx-localstorage';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsModule} from 'ngx-toast-notifications';

import {AppComponent} from './app.component';
import {ContainerComponent} from './shared/components/container/container.component';
import {VisitorsComponent} from './pages/visitors/visitors.component';
import {VisitorFormComponent} from './pages/visitor-form/visitor-form.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';

import {VisitorsService} from './services/visitors/visitors.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    VisitorsComponent,
    VisitorFormComponent,
    PageNotFoundComponent,
    ToolbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    NgxLoaderIndicatorModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    ToastNotificationsModule
  ],
  providers: [
    {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: {duration: 6000, preventDuplicates: true, position: 'bottom-right'}},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    VisitorsService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
