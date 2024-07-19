import { TestBed } from '@angular/core/testing';

import { CollectionsDataResolverService } from './collections-data-resolver.service';

describe('CollectionsDataResolverService', () => {
  let service: CollectionsDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
