import { Injectable, signal } from '@angular/core';

export type TipoNotificacion = 'exito' | 'error' | 'info';

export interface Notificacion {
  mensaje: string;
  tipo: TipoNotificacion;
}

const DURACION_MS = 3000;

/** Muestra mensajes cortos (toasts) en cualquier parte de la app. */
@Injectable({ providedIn: 'root' })
export class NotificacionService {
  readonly actual = signal<Notificacion | null>(null);
  private temporizador?: ReturnType<typeof setTimeout>;

  mostrar(mensaje: string, tipo: TipoNotificacion = 'exito'): void {
    clearTimeout(this.temporizador);
    this.actual.set({ mensaje, tipo });
    this.temporizador = setTimeout(() => this.cerrar(), DURACION_MS);
  }

  cerrar(): void {
    this.actual.set(null);
  }
}
