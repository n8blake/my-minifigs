import { TestBed } from '@angular/core/testing';

import { UserRouteActivatorService } from './user-route-activator.service';

describe('UserRouteActivatorService', () => {
  let service: UserRouteActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRouteActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
