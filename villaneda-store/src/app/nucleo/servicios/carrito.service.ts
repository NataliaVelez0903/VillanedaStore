import { computed, inject, Injectable, signal } from '@angular/core';
import { CLAVE_CARRITO } from '../../compartido/constantes/almacenamiento';
import { ItemCarrito } from '../../compartido/modelos/item-carrito';
import { Producto } from '../../compartido/modelos/producto';
import { calcularPrecioFinal } from '../../compartido/utilidades/precios';
import { AlmacenamientoService } from './almacenamiento.service';
import { ProductosService } from './productos.service';

/** Lo que se guarda en localStorage: solo el id y la cantidad. */
interface ItemGuardado {
  id: string;
  cantidad: number;
}

const CANTIDAD_MAXIMA = 10;

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly almacenamiento = inject(AlmacenamientoService);
  private readonly productosService = inject(ProductosService);

  private readonly itemsSignal = signal<ItemCarrito[]>(this.cargar());

  /** Lista de solo lectura para los componentes. */
  readonly items = this.itemsSignal.asReadonly();
  readonly cantidadTotal = computed(() =>
    this.itemsSignal().reduce((suma, item) => suma + item.cantidad, 0),
  );
  readonly total = computed(() =>
    this.itemsSignal().reduce((suma, item) => suma + calcularPrecioFinal(item.producto) * item.cantidad, 0),
  );

  agregar(producto: Producto, cantidad = 1): void {
    const existente = this.itemsSignal().find((item) => item.producto.id === producto.id);
    if (existente) {
      this.cambiarCantidad(producto.id, existente.cantidad + cantidad);
      return;
    }
    this.actualizar([...this.itemsSignal(), { producto, cantidad: Math.min(cantidad, CANTIDAD_MAXIMA) }]);
  }

  cambiarCantidad(idProducto: string, cantidad: number): void {
    if (cantidad < 1) {
      this.quitar(idProducto);
      return;
    }
    const nuevaCantidad = Math.min(cantidad, CANTIDAD_MAXIMA);
    this.actualizar(
      this.itemsSignal().map((item) =>
        item.producto.id === idProducto ? { ...item, cantidad: nuevaCantidad } : item,
      ),
    );
  }

  quitar(idProducto: string): void {
    this.actualizar(this.itemsSignal().filter((item) => item.producto.id !== idProducto));
  }

  vaciar(): void {
    this.actualizar([]);
  }

  private actualizar(items: ItemCarrito[]): void {
    this.itemsSignal.set(items);
    const guardados: ItemGuardado[] = items.map((item) => ({ id: item.producto.id, cantidad: item.cantidad }));
    this.almacenamiento.guardar(CLAVE_CARRITO, guardados);
  }

  private cargar(): ItemCarrito[] {
    const guardados = this.almacenamiento.leer<ItemGuardado[]>(CLAVE_CARRITO, []);
    return guardados.flatMap((guardado) => {
      const producto = this.productosService.obtenerPorId(guardado.id);
      return producto ? [{ producto, cantidad: guardado.cantidad }] : [];
    });
  }
}
