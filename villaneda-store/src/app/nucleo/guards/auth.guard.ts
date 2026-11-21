import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

/**
 * Protege rutas privadas: si no hay sesión, envía al login y guarda
 * en "volver" la página a la que quería entrar.
 */
export const authGuard: CanActivateFn = (_ruta, estado) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaAutenticado()) {
    return true;
  }
  return router.createUrlTree(['/iniciar-sesion'], { queryParams: { volver: estado.url } });
};
