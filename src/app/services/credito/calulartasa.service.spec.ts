import { TestBed } from '@angular/core/testing';

import { CalulartasaService } from './calulartasa.service';

describe('CalulartasaService', () => {
  let service: CalulartasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalulartasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
