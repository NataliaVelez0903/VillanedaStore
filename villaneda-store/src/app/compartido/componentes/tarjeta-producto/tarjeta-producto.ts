import { Component, computed, inject, input, output } from '@angular/core';
import { ProductosService } from '../../../nucleo/servicios/productos.service';
import { Producto } from '../../modelos/producto';
import { PrecioPipe } from '../../pipes/precio-pipe';
import { calcularPrecioFinal } from '../../utilidades/precios';

/**
 * Tarjeta reutilizable de producto (Inicio, Relojes y Ofertas).
 * Recibe el producto por input() y avisa al padre con output().
 */
@Component({
  imports: [PrecioPipe],
  selector: 'app-tarjeta-producto',
  styleUrl: './tarjeta-producto.css',
  templateUrl: './tarjeta-producto.html',
})
export class TarjetaProducto {
  private readonly productosService = inject(ProductosService);

  readonly producto = input.required<Producto>();
  /** Muestra el botón "Agregar al carrito" (alternativa táctil al arrastrar). */
  readonly mostrarAgregar = input(false);

  readonly verDetalle = output<Producto>();
  readonly agregar = output<Producto>();

  protected readonly nombreMarca = computed(() => this.productosService.nombreMarca(this.producto().marca));
  protected readonly precioFinal = computed(() => calcularPrecioFinal(this.producto()));
  protected readonly tieneDescuento = computed(() => (this.producto().descuentoPorcentaje ?? 0) > 0);
}