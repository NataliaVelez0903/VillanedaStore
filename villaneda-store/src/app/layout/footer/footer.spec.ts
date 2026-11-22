import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Footer } from './footer';

describe('Footer', () => {
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Footer);
    await fixture.whenStable();
  });

  it('debe crearse', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar la franja ¿Tienes dudas?', () => {
    expect(fixture.nativeElement.textContent).toContain('¿Tienes dudas?');
  });
});
