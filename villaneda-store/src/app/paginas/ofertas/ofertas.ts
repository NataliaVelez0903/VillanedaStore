import { Component, inject } from '@angular/core';
import { TarjetaProducto } from '../../compartido/componentes/tarjeta-producto/tarjeta-producto';
import { ModalProductoService } from '../../nucleo/servicios/modal-producto.service';
import { ProductosService } from '../../nucleo/servicios/productos.service';

/** Página "Ofertas": todos los relojes con descuento, del mayor al menor. */
@Component({
  imports: [TarjetaProducto],
  selector: 'app-ofertas',
  styleUrl: './ofertas.css',
  templateUrl: './ofertas.html',
})
export class Ofertas {
  protected readonly modal = inject(ModalProductoService);
  protected readonly ofertas = inject(ProductosService).obtenerOfertas();

  /** El mayor descuento (el primero, porque vienen ordenadas). */
  protected readonly descuentoMaximo = this.ofertas[0]?.descuentoPorcentaje ?? 0;
}