import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionBeneficiarioComponent } from './informacion-beneficiario.component';

describe('InformacionBeneficiarioComponent', () => {
  let component: InformacionBeneficiarioComponent;
  let fixture: ComponentFixture<InformacionBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionBeneficiarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
