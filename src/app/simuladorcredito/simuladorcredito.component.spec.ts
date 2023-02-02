import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorcreditoComponent } from './simuladorcredito.component';

describe('SimuladorcreditoComponent', () => {
  let component: SimuladorcreditoComponent;
  let fixture: ComponentFixture<SimuladorcreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorcreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorcreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
