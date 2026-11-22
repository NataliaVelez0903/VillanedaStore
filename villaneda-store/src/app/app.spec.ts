import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('debe crear la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar navbar y footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html: HTMLElement = fixture.nativeElement;
    expect(html.querySelector('app-navbar')).toBeTruthy();
    expect(html.querySelector('app-footer')).toBeTruthy();
  });
});
