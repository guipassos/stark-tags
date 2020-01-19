import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VisitorsComponent} from './visitors.component';
import {ToolbarComponent} from '../../shared/components/toolbar/toolbar.component';
import {ContainerComponent} from '../../shared/components/container/container.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalStorageService} from 'ngx-localstorage';
import {BsModalService, ModalModule} from 'ngx-bootstrap';
import {ToastNotificationsModule} from 'ngx-toast-notifications';

describe('VisitorsComponent', () => {
  let component: VisitorsComponent;
  let fixture: ComponentFixture<VisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ModalModule.forRoot(),
        ToastNotificationsModule,
      ],
      declarations: [VisitorsComponent, ToolbarComponent, ContainerComponent],
      providers: [
        {provide: LocalStorageService, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
