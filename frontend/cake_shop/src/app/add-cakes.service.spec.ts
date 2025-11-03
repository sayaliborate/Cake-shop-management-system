import { TestBed } from '@angular/core/testing';

import { AddCakesService } from './add-cakes.service';

describe('AddCakesService', () => {
  let service: AddCakesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCakesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
