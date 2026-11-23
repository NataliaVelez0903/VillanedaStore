import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarjetaProducto } from '../../compartido/componentes/tarjeta-producto/tarjeta-producto';
import { FiltroCategoria, Producto } from '../../compartido/modelos/producto';
import { PrecioPipe } from '../../compartido/pipes/precio-pipe';
import { CarritoService } from '../../nucleo/servicios/carrito.service';
import { ModalProductoService } from '../../nucleo/servicios/modal-producto.service';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';
import { OrdenCatalogo, ProductosService } from '../../nucleo/servicios/productos.service';

interface OpcionCategoria {
  etiqueta: string;
  valor: FiltroCategoria;
}

const CATEGORIAS: OpcionCategoria[] = [
  { etiqueta: 'Hombre', valor: 'hombre' },
  { etiqueta: 'Mujer', valor: 'mujer' },
  { etiqueta: 'Deportivos', valor: 'deportivo' },
  { etiqueta: 'Unisex', valor: 'unisex' },
  { etiqueta: 'Nuevos', valor: 'nuevos' },
];

const DURACION_ANIMACION_MS = 600;

/**
 * Página "Relojes": catálogo con filtros por URL y arrastrar y soltar al carrito.
 * Los filtros viven en la URL (?categoria=mujer&marca=qq) para poder compartir el enlace.
 */
@Component({
  imports: [TarjetaProducto, CdkDropList, CdkDrag, FormsModule, RouterLink, PrecioPipe],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  private readonly productosService = inject(ProductosService);
  private readonly router = inject(Router);
  private readonly ruta = inject(ActivatedRoute);
  private readonly notificaciones = inject(NotificacionService);
  protected readonly carrito = inject(CarritoService);
  protected readonly modal = inject(ModalProductoService);

  /** Llegan desde la URL gracias a withComponentInputBinding(). */
  readonly categoria = input<string>();
  readonly marca = input<string>();
  readonly buscar = input<string>();

  protected readonly categorias = CATEGORIAS;
  protected readonly marcas = this.productosService.obtenerMarcas();
  protected readonly orden = signal<OrdenCatalogo>('relevancia');
  protected readonly carritoAnimado = signal(false);

  private readonly categoriaValida = computed(() =>
    CATEGORIAS.find((opcion) => opcion.valor === this.categoria())?.valor,
  );

  protected readonly productos = computed(() =>
    this.productosService.filtrar({
      categoria: this.categoriaValida(),
      marca: this.marca(),
      busqueda: this.buscar(),
      orden: this.orden(),
    }),
  );

  protected readonly hayFiltros = computed(() => !!(this.categoria() || this.marca() || this.buscar()));

  cambiarFiltro(nombre: 'categoria' | 'marca' | 'buscar', valor: string | null): void {
    this.router.navigate([], {
      relativeTo: this.ruta,
      queryParams: { [nombre]: valor || null },
      queryParamsHandling: 'merge',
    });
  }

  limpiarFiltros(): void {
    this.router.navigate([], { relativeTo: this.ruta, queryParams: {} });
  }

  /** Se ejecuta cuando sueltan una tarjeta sobre la zona del carrito. */
  soltarEnCarrito(evento: CdkDragDrop<Producto[], Producto[], Producto>): void {
    this.agregarAlCarrito(evento.item.data);
  }

  agregarAlCarrito(producto: Producto): void {
    this.carrito.agregar(producto);
    this.notificaciones.mostrar(`${producto.nombre} se agregó al carrito.`, 'exito');
    this.carritoAnimado.set(true);
    setTimeout(() => this.carritoAnimado.set(false), DURACION_ANIMACION_MS);
  }
}