import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionTransferenciaComponent } from './informacion-transferencia.component';

describe('InformacionTransferenciaComponent', () => {
  let component: InformacionTransferenciaComponent;
  let fixture: ComponentFixture<InformacionTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionTransferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
