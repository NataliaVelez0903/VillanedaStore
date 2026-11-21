import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

const MS_POR_DIA = 24 * 60 * 60 * 1000;

/**
 * Guarda, lee y elimina cookies del navegador.
 * Es el único lugar de la app que toca document.cookie.
 */
@Injectable({ providedIn: 'root' })
export class CookiesService {
  private readonly documento = inject(DOCUMENT);

  /**
   * @param dias Días que dura la cookie. Si no se envía, es una cookie
   *             de sesión y el navegador la borra al cerrarse.
   */
  guardar(nombre: string, valor: string, dias?: number): void {
    let cookie = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}; path=/; SameSite=Lax`;
    if (dias !== undefined) {
      const vence = new Date(Date.now() + dias * MS_POR_DIA);
      cookie += `; expires=${vence.toUTCString()}`;
    }
    this.documento.cookie = cookie;
  }

  leer(nombre: string): string | null {
    const buscada = `${encodeURIComponent(nombre)}=`;
    const encontrada = this.documento.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(buscada));
    return encontrada ? decodeURIComponent(encontrada.substring(buscada.length)) : null;
  }

  /** Para borrar una cookie se reescribe con una fecha de vencimiento pasada. */
  eliminar(nombre: string): void {
    this.documento.cookie = `${encodeURIComponent(nombre)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
