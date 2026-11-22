import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Inicio } from './inicio';

describe('Inicio', () => {
  let fixture: ComponentFixture<Inicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inicio],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Inicio);
    await fixture.whenStable();
  });

  it('debe crearse', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar 4 ofertas destacadas', () => {
    expect(fixture.nativeElement.querySelectorAll('.oferta').length).toBe(4);
  });
});
