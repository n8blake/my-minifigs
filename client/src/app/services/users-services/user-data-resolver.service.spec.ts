import { TestBed } from '@angular/core/testing';

import { UserDataResolverService } from './user-data-resolver.service';

describe('UserDataResolverService', () => {
  let service: UserDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
