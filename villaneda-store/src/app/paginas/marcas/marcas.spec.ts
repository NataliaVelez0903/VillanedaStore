import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Marcas } from './marcas';

describe('Marcas', () => {
  let fixture: ComponentFixture<Marcas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marcas],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Marcas);
    await fixture.whenStable();
  });

  it('debe crearse', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
