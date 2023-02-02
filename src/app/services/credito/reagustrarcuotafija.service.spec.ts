import { TestBed } from '@angular/core/testing';

import { ReagustrarcuotafijaService } from './reagustrarcuotafija.service';

describe('ReagustrarcuotafijaService', () => {
  let service: ReagustrarcuotafijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReagustrarcuotafijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
