import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TarjetaProducto } from '../../compartido/componentes/tarjeta-producto/tarjeta-producto';
import { Producto } from '../../compartido/modelos/producto';
import { FavoritosService } from '../../nucleo/servicios/favoritos.service';
import { ModalProductoService } from '../../nucleo/servicios/modal-producto.service';

@Component({
  imports: [
    RouterLink,
    TarjetaProducto,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
  ],
  selector: 'app-favoritos',
  styleUrl: './favoritos.css',
  templateUrl: './favoritos.html',
})
export class Favoritos {
  private readonly favoritosService = inject(FavoritosService);

  readonly productos = this.favoritosService.productos;
  readonly modal = inject(ModalProductoService);

  quitarFavorito(producto: Producto): void {
    if (this.favoritosService.esFavorito(producto.id)) {
      this.favoritosService.alternar(producto);
    }
  }

  moverFavorito(indice: number, desplazamiento: -1 | 1): void {
    const destino = indice + desplazamiento;

    if (destino < 0 || destino >= this.productos().length) {
      return;
    }

    this.favoritosService.reordenar(indice, destino);
  }

  soltarFavorito(evento: CdkDragDrop<Producto[]>): void {
    if (
      evento.previousContainer !== evento.container ||
      evento.previousIndex === evento.currentIndex
    ) {
      return;
    }

    this.favoritosService.reordenar(
      evento.previousIndex,
      evento.currentIndex,
    );
  }
}