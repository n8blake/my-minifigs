import { TestBed } from '@angular/core/testing';

import { SetsRouteActivatorService } from './sets-route-activator.service';

describe('SetsRouteActivatorService', () => {
  let service: SetsRouteActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetsRouteActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
