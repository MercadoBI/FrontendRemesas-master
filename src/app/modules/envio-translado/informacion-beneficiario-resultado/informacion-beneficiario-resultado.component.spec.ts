import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionBeneficiarioResultadoComponent } from './informacion-beneficiario-resultado.component';

describe('InformacionBeneficiarioResultadoComponent', () => {
  let component: InformacionBeneficiarioResultadoComponent;
  let fixture: ComponentFixture<InformacionBeneficiarioResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionBeneficiarioResultadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionBeneficiarioResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
