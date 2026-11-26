import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  provideRouter,
  Router,
  UrlTree,
} from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { invitadoGuard } from './invitado.guard';
import { AuthService } from '../servicios/auth.service';

describe('invitadoGuard', () => {
  const autenticacion = {
    estaAutenticado: vi.fn(),
  };

  const ruta = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    vi.resetAllMocks();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: autenticacion,
        },
      ],
    });
  });

  it('debe permitir ingresar al login sin tener sesion', () => {
    autenticacion.estaAutenticado.mockReturnValue(false);

    const estado = {
      url: '/iniciar-sesion',
    } as RouterStateSnapshot;

    const resultado = TestBed.runInInjectionContext(() =>
      invitadoGuard(ruta, estado)
    );

    expect(resultado).toBe(true);
  });

  it('debe permitir ingresar al registro sin tener sesion', () => {
    autenticacion.estaAutenticado.mockReturnValue(false);

    const estado = {
      url: '/registro',
    } as RouterStateSnapshot;

    const resultado = TestBed.runInInjectionContext(() =>
      invitadoGuard(ruta, estado)
    );

    expect(resultado).toBe(true);
  });

  it('debe redirigir al inicio si el usuario ya tiene sesion', () => {
    autenticacion.estaAutenticado.mockReturnValue(true);

    const estado = {
      url: '/iniciar-sesion',
    } as RouterStateSnapshot;

    const resultado = TestBed.runInInjectionContext(() =>
      invitadoGuard(ruta, estado)
    );

    const router = TestBed.inject(Router);

    expect(resultado).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(resultado as UrlTree)).toBe('/inicio');
  });

  it('debe impedir el acceso al registro si ya tiene sesion', () => {
    autenticacion.estaAutenticado.mockReturnValue(true);

    const estado = {
      url: '/registro',
    } as RouterStateSnapshot;

    const resultado = TestBed.runInInjectionContext(() =>
      invitadoGuard(ruta, estado)
    );

    const router = TestBed.inject(Router);

    expect(resultado).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(resultado as UrlTree)).toBe('/inicio');
  });
});