import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IniciarSesion } from './iniciar-sesion';

describe('IniciarSesion', () => {
  let component: IniciarSesion;
  let fixture: ComponentFixture<IniciarSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarSesion],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
});