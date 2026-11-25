import { TestBed } from '@angular/core/testing';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service';
import { AlmacenamientoService } from './almacenamiento.service';
import { CookiesService } from './cookies.service';
import { ConsentimientoCookiesService } from './consentimiento-cookies.service';

import {
  CLAVE_USUARIOS,
  COOKIE_SESION,
  COOKIE_RECORDAR_CORREO,
} from '../../compartido/constantes/almacenamiento';

describe('AuthService', () => {
  let servicio: AuthService;

  const datos = new Map<string, unknown>();
  const cookiesGuardadas = new Map<string, string>();

  const almacenamiento = {
    leer: vi.fn((clave: string, defecto: unknown) => {
      return datos.get(clave) ?? defecto;
    }),

    guardar: vi.fn((clave: string, valor: unknown) => {
      datos.set(clave, valor);
    }),
  };

  const cookies = {
    leer: vi.fn((clave: string) => {
      return cookiesGuardadas.get(clave);
    }),

    guardar: vi.fn(
      (clave: string, valor: string, _dias?: number) => {
        cookiesGuardadas.set(clave, valor);
      }
    ),

    eliminar: vi.fn((clave: string) => {
      cookiesGuardadas.delete(clave);
    }),
  };

  const consentimiento = {
    preferenciasPermitidas: vi.fn(),
  };

  const usuarioPrueba = {
    nombre: 'Usuario Prueba',
    correo: 'prueba@example.com',
    contrasena: 'Prueba123',
  };

  beforeEach(() => {
    datos.clear();
    cookiesGuardadas.clear();
    vi.clearAllMocks();

    consentimiento.preferenciasPermitidas.mockReturnValue(true);

    // Simula el calculo del hash durante las pruebas.
    vi.stubGlobal('crypto', {
      subtle: {
        digest: vi.fn(
          async (_algoritmo: string, bytes: Uint8Array) => {
            return new Uint8Array(bytes).buffer;
          }
        ),
      },
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: AlmacenamientoService,
          useValue: almacenamiento,
        },
        {
          provide: CookiesService,
          useValue: cookies,
        },
        {
          provide: ConsentimientoCookiesService,
          useValue: consentimiento,
        },
      ],
    });

    servicio = TestBed.inject(AuthService);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('debe crearse correctamente', () => {
    expect(servicio).toBeTruthy();
  });

  it('debe registrar un usuario nuevo', async () => {
    const resultado = await servicio.registrar(usuarioPrueba);

    expect(resultado.exito).toBe(true);
    expect(datos.has(CLAVE_USUARIOS)).toBe(true);
  });

  it('debe impedir el registro de correos duplicados', async () => {
    await servicio.registrar(usuarioPrueba);

    const resultado = await servicio.registrar(usuarioPrueba);

    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toBe(
      'Ya existe una cuenta con ese correo.'
    );
  });

  it('debe iniciar sesion con credenciales correctas', async () => {
    await servicio.registrar(usuarioPrueba);

    const resultado = await servicio.iniciarSesion(
      usuarioPrueba.correo,
      usuarioPrueba.contrasena,
      false
    );

    expect(resultado).toBe(true);
    expect(servicio.estaAutenticado()).toBe(true);
    expect(servicio.usuario()?.correo).toBe(usuarioPrueba.correo);
  });

  it('debe rechazar una contrasena incorrecta', async () => {
    await servicio.registrar(usuarioPrueba);

    const resultado = await servicio.iniciarSesion(
      usuarioPrueba.correo,
      'Incorrecta123',
      false
    );

    expect(resultado).toBe(false);
    expect(servicio.estaAutenticado()).toBe(false);
  });

  it('debe rechazar un usuario que no existe', async () => {
    const resultado = await servicio.iniciarSesion(
      'inexistente@example.com',
      'Prueba123',
      false
    );

    expect(resultado).toBe(false);
    expect(servicio.estaAutenticado()).toBe(false);
  });

  it('debe cerrar la sesion correctamente', async () => {
    await servicio.registrar(usuarioPrueba);

    await servicio.iniciarSesion(
      usuarioPrueba.correo,
      usuarioPrueba.contrasena,
      false
    );

    servicio.cerrarSesion();

    expect(servicio.estaAutenticado()).toBe(false);
    expect(servicio.usuario()).toBeNull();
    expect(cookiesGuardadas.has(COOKIE_SESION)).toBe(false);
  });

  it('debe recordar la sesion durante 7 dias', async () => {
    await servicio.registrar(usuarioPrueba);

    await servicio.iniciarSesion(
      usuarioPrueba.correo,
      usuarioPrueba.contrasena,
      true
    );

    expect(cookies.guardar).toHaveBeenCalledWith(
      COOKIE_SESION,
      usuarioPrueba.correo,
      7
    );
  });

  it('debe recordar el correo cuando existe consentimiento', async () => {
    await servicio.registrar(usuarioPrueba);

    await servicio.iniciarSesion(
      usuarioPrueba.correo,
      usuarioPrueba.contrasena,
      true
    );

    expect(servicio.correoRecordado()).toBe(usuarioPrueba.correo);

    expect(cookies.guardar).toHaveBeenCalledWith(
      COOKIE_RECORDAR_CORREO,
      usuarioPrueba.correo,
      30
    );
  });

  it('no debe recordar el correo si se rechazan las cookies', async () => {
    consentimiento.preferenciasPermitidas.mockReturnValue(false);

    await servicio.registrar(usuarioPrueba);

    await servicio.iniciarSesion(
      usuarioPrueba.correo,
      usuarioPrueba.contrasena,
      true
    );

    expect(servicio.correoRecordado()).toBe('');
    expect(cookiesGuardadas.has(COOKIE_RECORDAR_CORREO)).toBe(false);
  });

  it('debe permitir olvidar el correo guardado', async () => {
    await servicio.registrar(usuarioPrueba);

    await servicio.iniciarSesion(
      usuarioPrueba.correo,
      usuarioPrueba.contrasena,
      true
    );

    servicio.olvidarCorreo();

    expect(servicio.correoRecordado()).toBe('');
  });
});