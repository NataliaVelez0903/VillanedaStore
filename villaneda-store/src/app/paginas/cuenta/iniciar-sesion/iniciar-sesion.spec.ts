import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { IniciarSesion } from './iniciar-sesion';
import { AuthService } from '../../../nucleo/servicios/auth.service';

describe('IniciarSesion', () => {
  let component: IniciarSesion;
  let fixture: ComponentFixture<IniciarSesion>;

  const autenticacion = {
    correoRecordado: vi.fn(),
    iniciarSesion: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    autenticacion.correoRecordado.mockReturnValue('');

    await TestBed.configureTestingModule({
      imports: [IniciarSesion],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: autenticacion,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar con el formulario invalido', () => {
    expect(component.formulario.invalid).toBe(true);
  });

  it('debe rechazar un correo invalido', () => {
    component.formulario.controls.correo.setValue('correo123');

    expect(component.formulario.controls.correo.invalid).toBe(true);
  });

  it('debe exigir una contrasena', () => {
    component.formulario.controls.contrasena.setValue('');

    expect(component.formulario.controls.contrasena.invalid).toBe(true);
  });

  it('debe aceptar un formulario con datos validos', () => {
    component.formulario.patchValue({
      correo: 'prueba@example.com',
      contrasena: 'Prueba123',
    });

    expect(component.formulario.valid).toBe(true);
  });

  it('debe iniciar con recordar sesion desactivado', () => {
    expect(component.formulario.controls.recordar.value).toBe(false);
  });

  it('no debe intentar iniciar sesion con un formulario invalido', async () => {
    await component.iniciarSesion();

    expect(autenticacion.iniciarSesion).not.toHaveBeenCalled();
  });

  it('debe mostrar un error cuando las credenciales son incorrectas', async () => {
    autenticacion.iniciarSesion.mockResolvedValue(false);

    component.formulario.patchValue({
      correo: 'prueba@example.com',
      contrasena: 'Incorrecta123',
    });

    await component.iniciarSesion();

    expect(component.mensajeError()).toBe(
      'El correo o la contraseña son incorrectos.'
    );

    expect(component.ingresando()).toBe(false);
  });

  it('debe recuperar el correo recordado', () => {
    autenticacion.correoRecordado.mockReturnValue(
      'prueba@example.com'
    );

    const nuevaVista = TestBed.createComponent(IniciarSesion);

    expect(
      nuevaVista.componentInstance.formulario.controls.correo.value
    ).toBe('prueba@example.com');

    expect(
      nuevaVista.componentInstance.formulario.controls.contrasena.value
    ).toBe('');

    nuevaVista.destroy();
  });
});