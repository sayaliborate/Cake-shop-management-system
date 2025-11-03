import { TestBed } from '@angular/core/testing';

import { CakeorderService } from './cakeorder.service';

describe('CakeorderService', () => {
  let service: CakeorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CakeorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
