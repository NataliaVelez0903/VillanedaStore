import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();
  });

  it('debe crearse', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe abrir y cerrar el menú con la hamburguesa', async () => {
    const html: HTMLElement = fixture.nativeElement;
    const boton = html.querySelector<HTMLButtonElement>('.hamburguesa')!;
    boton.click();
    await fixture.whenStable();
    expect(html.querySelector('.menu--abierto')).toBeTruthy();
    boton.click();
    await fixture.whenStable();
    expect(html.querySelector('.menu--abierto')).toBeNull();
  });
});
