import { TestBed } from '@angular/core/testing';

import { MinifigsService } from './minifigs.service';

describe('MinifigsService', () => {
  let service: MinifigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinifigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
