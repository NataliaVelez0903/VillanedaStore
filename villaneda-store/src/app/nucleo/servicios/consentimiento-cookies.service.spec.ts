import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ConsentimientoCookiesService } from './consentimiento-cookies.service';
import { CookiesService } from './cookies.service';

import {
  COOKIE_CONSENTIMIENTO,
  COOKIE_RECORDAR_CORREO,
  COOKIE_SESION,
} from '../../compartido/constantes/almacenamiento';

describe('ConsentimientoCookiesService', () => {
  const cookiesGuardadas = new Map<string, string>();

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

  beforeEach(() => {
    cookiesGuardadas.clear();
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        ConsentimientoCookiesService,
        {
          provide: CookiesService,
          useValue: cookies,
        },
      ],
    });
  });

  it('debe iniciar con el consentimiento pendiente', () => {
    const servicio = TestBed.inject(ConsentimientoCookiesService);

    expect(servicio.estado()).toBe('pendiente');
    expect(servicio.mostrarBanner()).toBe(true);
    expect(servicio.preferenciasPermitidas()).toBe(false);
  });

  it('debe permitir aceptar las cookies', () => {
    const servicio = TestBed.inject(ConsentimientoCookiesService);

    servicio.aceptar();

    expect(servicio.estado()).toBe('aceptadas');
    expect(servicio.preferenciasPermitidas()).toBe(true);
    expect(servicio.mostrarBanner()).toBe(false);
  });

  it('debe guardar el consentimiento durante 180 dias', () => {
    const servicio = TestBed.inject(ConsentimientoCookiesService);

    servicio.aceptar();

    expect(cookies.guardar).toHaveBeenCalledWith(
      COOKIE_CONSENTIMIENTO,
      'aceptadas',
      180
    );
  });

  it('debe permitir rechazar las cookies', () => {
    const servicio = TestBed.inject(ConsentimientoCookiesService);

    servicio.rechazar();

    expect(servicio.estado()).toBe('rechazadas');
    expect(servicio.preferenciasPermitidas()).toBe(false);
    expect(servicio.mostrarBanner()).toBe(false);

    expect(cookies.guardar).toHaveBeenCalledWith(
      COOKIE_CONSENTIMIENTO,
      'rechazadas',
      180
    );
  });

  it('debe eliminar el correo recordado al rechazar cookies', () => {
    cookiesGuardadas.set(
      COOKIE_RECORDAR_CORREO,
      'prueba@example.com'
    );

    const servicio = TestBed.inject(ConsentimientoCookiesService);

    servicio.rechazar();

    expect(
      cookiesGuardadas.has(COOKIE_RECORDAR_CORREO)
    ).toBe(false);
  });

  it('debe recuperar un consentimiento aceptado anteriormente', () => {
    cookiesGuardadas.set(
      COOKIE_CONSENTIMIENTO,
      'aceptadas'
    );

    const servicio = TestBed.inject(ConsentimientoCookiesService);

    expect(servicio.estado()).toBe('aceptadas');
    expect(servicio.mostrarBanner()).toBe(false);
    expect(servicio.preferenciasPermitidas()).toBe(true);
  });

  it('debe recuperar un consentimiento rechazado anteriormente', () => {
    cookiesGuardadas.set(
      COOKIE_CONSENTIMIENTO,
      'rechazadas'
    );

    const servicio = TestBed.inject(ConsentimientoCookiesService);

    expect(servicio.estado()).toBe('rechazadas');
    expect(servicio.mostrarBanner()).toBe(false);
    expect(servicio.preferenciasPermitidas()).toBe(false);
  });

  it('debe restablecer las preferencias de cookies', () => {
    const servicio = TestBed.inject(ConsentimientoCookiesService);

    servicio.aceptar();
    servicio.restablecer();

    expect(servicio.estado()).toBe('pendiente');
    expect(servicio.mostrarBanner()).toBe(true);
    expect(servicio.preferenciasPermitidas()).toBe(false);

    expect(
      cookiesGuardadas.has(COOKIE_CONSENTIMIENTO)
    ).toBe(false);
  });

  it('debe eliminar el correo al restablecer las preferencias', () => {
    cookiesGuardadas.set(
      COOKIE_RECORDAR_CORREO,
      'prueba@example.com'
    );

    const servicio = TestBed.inject(ConsentimientoCookiesService);

    servicio.restablecer();

    expect(
      cookiesGuardadas.has(COOKIE_RECORDAR_CORREO)
    ).toBe(false);
  });

  it('debe conservar la cookie de sesion al cambiar las preferencias', () => {
    cookiesGuardadas.set(
      COOKIE_SESION,
      'prueba@example.com'
    );

    const servicio = TestBed.inject(ConsentimientoCookiesService);

    servicio.rechazar();
    servicio.restablecer();

    expect(cookiesGuardadas.get(COOKIE_SESION)).toBe(
      'prueba@example.com'
    );

    expect(cookies.eliminar).not.toHaveBeenCalledWith(
      COOKIE_SESION
    );
  });
});