import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  provideRouter,
  Router,
  UrlTree,
} from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { authGuard } from './auth.guard';
import { AuthService } from '../servicios/auth.service';

describe('authGuard', () => {
  const autenticacion = {
    estaAutenticado: vi.fn(),
  };

  const ruta = {} as ActivatedRouteSnapshot;

  const estado = {
    url: '/favoritos',
  } as RouterStateSnapshot;

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

  it('debe permitir el acceso si el usuario tiene sesion', () => {
    autenticacion.estaAutenticado.mockReturnValue(true);

    const resultado = TestBed.runInInjectionContext(() =>
      authGuard(ruta, estado)
    );

    expect(resultado).toBe(true);
  });

  it('debe redirigir al inicio de sesion si no esta autenticado', () => {
    autenticacion.estaAutenticado.mockReturnValue(false);

    const resultado = TestBed.runInInjectionContext(() =>
      authGuard(ruta, estado)
    );

    const router = TestBed.inject(Router);

    expect(resultado).toBeInstanceOf(UrlTree);

    expect(router.serializeUrl(resultado as UrlTree))
      .toContain('/iniciar-sesion');
  });

  it('debe conservar la ruta a la que queria ingresar el usuario', () => {
    autenticacion.estaAutenticado.mockReturnValue(false);

    const resultado = TestBed.runInInjectionContext(() =>
      authGuard(ruta, estado)
    ) as UrlTree;

    expect(resultado.queryParams['volver']).toBe('/favoritos');
  });
});