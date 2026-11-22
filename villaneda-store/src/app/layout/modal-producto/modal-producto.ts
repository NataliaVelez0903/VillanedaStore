import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, HostListener, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { calcularPrecioFinal, tieneDescuento } from '../../compartido/utilidades/precios';
import { CarritoService } from '../../nucleo/servicios/carrito.service';
import { FavoritosService } from '../../nucleo/servicios/favoritos.service';
import { ModalProductoService } from '../../nucleo/servicios/modal-producto.service';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';
import { ProductosService } from '../../nucleo/servicios/productos.service';

/** Ventana con el detalle rápido de un producto (se abre desde Inicio, catálogo, ofertas…). */
@Component({
  selector: 'app-modal-producto',
  imports: [CurrencyPipe],
  templateUrl: './modal-producto.html',
  styleUrl: './modal-producto.css',
})
export class ModalProducto {
  private readonly documento = inject(DOCUMENT);
  private readonly productos = inject(ProductosService);
  private readonly carrito = inject(CarritoService);
  private readonly favoritos = inject(FavoritosService);
  private readonly notificacion = inject(NotificacionService);
  protected readonly modal = inject(ModalProductoService);

  protected readonly producto = this.modal.productoSeleccionado;
  protected readonly precioFinal = computed(() => {
    const producto = this.producto();
    return producto ? calcularPrecioFinal(producto) : 0;
  });
  protected readonly conDescuento = computed(() => {
    const producto = this.producto();
    return producto ? tieneDescuento(producto) : false;
  });
  protected readonly esFavorito = computed(() => {
    const producto = this.producto();
    return producto ? this.favoritos.esFavorito(producto.id) : false;
  });

  constructor() {
    // Evita que la página de fondo haga scroll mientras la ventana está abierta.
    effect(() => {
      this.documento.body.style.overflow = this.producto() ? 'hidden' : '';
    });
  }

  protected nombreMarca(id: string): string {
    return this.productos.nombreMarca(id);
  }

  protected agregarAlCarrito(): void {
    const producto = this.producto();
    if (!producto) {
      return;
    }
    this.carrito.agregar(producto);
    this.notificacion.mostrar(`${producto.nombre} se agregó al carrito.`, 'exito');
    this.modal.cerrar();
  }

  protected alternarFavorito(): void {
    const producto = this.producto();
    if (!producto) {
      return;
    }
    if (!this.favoritos.alternar(producto)) {
      this.notificacion.mostrar('Inicia sesión para guardar favoritos.', 'info');
      return;
    }
    this.notificacion.mostrar(
      this.favoritos.esFavorito(producto.id) ? 'Agregado a favoritos.' : 'Quitado de favoritos.',
      'exito',
    );
  }

  @HostListener('document:keydown.escape')
  protected cerrar(): void {
    this.modal.cerrar();
  }
}
