import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contacto } from './contacto';

describe('Contacto', () => {
  let fixture: ComponentFixture<Contacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Contacto] }).compileComponents();
    fixture = TestBed.createComponent(Contacto);
    await fixture.whenStable();
  });

  it('debe crearse', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe listar las 4 sedes', () => {
    expect(fixture.nativeElement.querySelectorAll('.lista-sedes li').length).toBe(4);
  });
});
