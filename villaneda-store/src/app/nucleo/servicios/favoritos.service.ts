import { moveItemInArray } from '@angular/cdk/drag-drop';
import { computed, inject, Injectable, signal } from '@angular/core';
import { CLAVE_FAVORITOS } from '../../compartido/constantes/almacenamiento';
import { Producto } from '../../compartido/modelos/producto';
import { AlmacenamientoService } from './almacenamiento.service';
import { AuthService } from './auth.service';
import { ProductosService } from './productos.service';

/** Favoritos de todos los usuarios: correo -> lista ordenada de ids de producto. */
type FavoritosPorUsuario = Record<string, string[]>;

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly almacenamiento = inject(AlmacenamientoService);
  private readonly auth = inject(AuthService);
  private readonly productosService = inject(ProductosService);

  private readonly todos = signal<FavoritosPorUsuario>(
    this.almacenamiento.leer<FavoritosPorUsuario>(CLAVE_FAVORITOS, {}),
  );

  /** Ids favoritos del usuario con sesión (vacío si no hay sesión). */
  private readonly ids = computed(() => {
    const correo = this.auth.usuario()?.correo;
    return correo ? (this.todos()[correo] ?? []) : [];
  });

  readonly productos = computed(() =>
    this.ids()
      .map((id) => this.productosService.obtenerPorId(id))
      .filter((producto): producto is Producto => producto !== undefined),
  );

  esFavorito(idProducto: string): boolean {
    return this.ids().includes(idProducto);
  }

  /**
   * Agrega o quita un producto de favoritos.
   * @returns false si no hay sesión iniciada (no se puede guardar).
   */
  alternar(producto: Producto): boolean {
    if (!this.auth.estaAutenticado()) {
      return false;
    }
    const ids = this.ids();
    const nuevos = ids.includes(producto.id)
      ? ids.filter((id) => id !== producto.id)
      : [...ids, producto.id];
    this.guardar(nuevos);
    return true;
  }

  /** Cambia el orden de la lista (se usa con arrastrar y soltar). */
  reordenar(desde: number, hasta: number): void {
    const ids = [...this.ids()];
    moveItemInArray(ids, desde, hasta);
    this.guardar(ids);
  }

  private guardar(ids: string[]): void {
    const correo = this.auth.usuario()?.correo;
    if (!correo) {
      return;
    }
    const actualizados = { ...this.todos(), [correo]: ids };
    this.todos.set(actualizados);
    this.almacenamiento.guardar(CLAVE_FAVORITOS, actualizados);
  }
}
