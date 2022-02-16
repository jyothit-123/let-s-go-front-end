import { TestBed } from '@angular/core/testing';

import { LetsgoService } from './letsgo.service';

describe('LetsgoService', () => {
  let service: LetsgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetsgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
