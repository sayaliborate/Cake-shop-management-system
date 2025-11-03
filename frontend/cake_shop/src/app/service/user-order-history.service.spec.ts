import { TestBed } from '@angular/core/testing';

import { UserOrderHistoryService } from './user-order-history.service';

describe('UserOrderHistoryService', () => {
  let service: UserOrderHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOrderHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
