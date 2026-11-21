import { Injectable, signal } from '@angular/core';
import { Producto } from '../../compartido/modelos/producto';

/** Controla qué producto se muestra en la ventana de detalle. */
@Injectable({ providedIn: 'root' })
export class ModalProductoService {
  readonly productoSeleccionado = signal<Producto | null>(null);

  abrir(producto: Producto): void {
    this.productoSeleccionado.set(producto);
  }

  cerrar(): void {
    this.productoSeleccionado.set(null);
  }
}
