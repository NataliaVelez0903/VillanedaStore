import { computed, inject, Injectable, signal } from '@angular/core';
import { COOKIE_CONSENTIMIENTO, COOKIE_RECORDAR_CORREO } from '../../compartido/constantes/almacenamiento';
import { CookiesService } from './cookies.service';

export type EstadoConsentimiento = 'pendiente' | 'aceptadas' | 'rechazadas';

const DIAS_CONSENTIMIENTO = 180;

/**
 * Maneja la decisión del usuario en el banner de cookies.
 * - La cookie de sesión es técnica (necesaria para el login) y no depende de esto.
 * - Las cookies de preferencias (recordar correo) solo se guardan si el usuario acepta.
 */
@Injectable({ providedIn: 'root' })
export class ConsentimientoCookiesService {
  private readonly cookies = inject(CookiesService);

  readonly estado = signal<EstadoConsentimiento>(this.leerEstado());
  readonly mostrarBanner = computed(() => this.estado() === 'pendiente');
  readonly preferenciasPermitidas = computed(() => this.estado() === 'aceptadas');

  aceptar(): void {
    this.cookies.guardar(COOKIE_CONSENTIMIENTO, 'aceptadas', DIAS_CONSENTIMIENTO);
    this.estado.set('aceptadas');
  }

  rechazar(): void {
    this.cookies.guardar(COOKIE_CONSENTIMIENTO, 'rechazadas', DIAS_CONSENTIMIENTO);
    this.cookies.eliminar(COOKIE_RECORDAR_CORREO);
    this.estado.set('rechazadas');
  }

  /** Borra la decisión para que el banner vuelva a aparecer. */
  restablecer(): void {
    this.cookies.eliminar(COOKIE_CONSENTIMIENTO);
    this.cookies.eliminar(COOKIE_RECORDAR_CORREO);
    this.estado.set('pendiente');
  }

  private leerEstado(): EstadoConsentimiento {
    const valor = this.cookies.leer(COOKIE_CONSENTIMIENTO);
    return valor === 'aceptadas' || valor === 'rechazadas' ? valor : 'pendiente';
  }
}
