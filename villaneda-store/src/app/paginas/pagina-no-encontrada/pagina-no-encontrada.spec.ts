import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PaginaNoEncontrada } from './pagina-no-encontrada';

describe('PaginaNoEncontrada', () => {
  let fixture: ComponentFixture<PaginaNoEncontrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNoEncontrada],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(PaginaNoEncontrada);
    await fixture.whenStable();
  });

  it('debe crearse', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
