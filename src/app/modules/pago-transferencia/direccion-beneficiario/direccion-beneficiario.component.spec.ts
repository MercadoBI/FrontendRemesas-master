import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionBeneficiarioComponent } from './direccion-beneficiario.component';

describe('DireccionBeneficiarioComponent', () => {
  let component: DireccionBeneficiarioComponent;
  let fixture: ComponentFixture<DireccionBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DireccionBeneficiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
