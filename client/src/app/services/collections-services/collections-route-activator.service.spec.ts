import { TestBed } from '@angular/core/testing';

import { CollectionsRouteActivatorService } from './collections-route-activator.service';

describe('CollectionsRouteActivatorService', () => {
  let service: CollectionsRouteActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsRouteActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
