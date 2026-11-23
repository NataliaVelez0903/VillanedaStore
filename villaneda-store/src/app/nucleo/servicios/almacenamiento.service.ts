import { Injectable } from '@angular/core';

/**
 * Envoltorio de localStorage: convierte a JSON y evita que un dato
 * dañado rompa la aplicación.
 */
@Injectable({ providedIn: 'root' })
export class AlmacenamientoService {
  leer<T>(clave: string, valorPorDefecto: T): T {
    const texto = localStorage.getItem(clave);
    if (texto === null) {
      return valorPorDefecto;
    }
    try {
      return JSON.parse(texto) as T;
    } catch {
      return valorPorDefecto;
    }
  }

  guardar<T>(clave: string, valor: T): void {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  eliminar(clave: string): void {
    localStorage.removeItem(clave);
  }
}