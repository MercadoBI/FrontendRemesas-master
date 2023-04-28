import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoIdentidadComponent } from './documento-identidad.component';

describe('DocumentoIdentidadComponent', () => {
  let component: DocumentoIdentidadComponent;
  let fixture: ComponentFixture<DocumentoIdentidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoIdentidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoIdentidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
