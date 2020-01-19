import {TestBed} from '@angular/core/testing';

import {VisitorsService} from './visitors.service';
import {LocalStorageService} from 'ngx-localstorage';

describe('VisitorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: LocalStorageService, useValue: {}}
    ]
  }));

  it('should be created', () => {
    const service: VisitorsService = TestBed.get(VisitorsService);
    expect(service).toBeTruthy();
  });
});
