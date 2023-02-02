import { TestBed } from '@angular/core/testing';

import { FechasiguienteService } from './fechasiguiente.service';

describe('FechasiguienteService', () => {
  let service: FechasiguienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechasiguienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
