import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Registro } from './registro';

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar con el formulario invalido', () => {
    expect(component.formulario.invalid).toBe(true);
  });

  it('debe rechazar un nombre demasiado corto', () => {
    component.formulario.controls.nombre.setValue('A');

    expect(component.formulario.controls.nombre.invalid).toBe(true);
  });

  it('debe rechazar un correo invalido', () => {
    component.formulario.controls.correo.setValue('correo123');

    expect(component.formulario.controls.correo.invalid).toBe(true);
  });

  it('debe rechazar una contrasena menor a 8 caracteres', () => {
    component.formulario.controls.contrasena.setValue('12345');

    expect(component.formulario.controls.contrasena.invalid).toBe(true);
  });

  it('debe detectar contrasenas diferentes', () => {
    component.formulario.patchValue({
      nombre: 'Usuario Prueba',
      correo: 'prueba@example.com',
      contrasena: 'Prueba123',
      confirmarContrasena: 'Prueba456',
    });

    expect(
      component.formulario.hasError('contrasenasNoCoinciden')
    ).toBe(true);
  });

  it('debe aceptar un formulario con datos validos', () => {
    component.formulario.patchValue({
      nombre: 'Usuario Prueba',
      correo: 'prueba@example.com',
      contrasena: 'Prueba123',
      confirmarContrasena: 'Prueba123',
    });

    expect(component.formulario.valid).toBe(true);
  });
});