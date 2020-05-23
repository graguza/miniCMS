import { TestBed } from '@angular/core/testing';

import { ListChangedService } from './list-changed.service';

describe('ListChangedService', () => {
  let service: ListChangedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListChangedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
