import { TestBed } from '@angular/core/testing';

import { SetDataResolverService } from './set-data-resolver.service';

describe('SetDataResolverService', () => {
  let service: SetDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
