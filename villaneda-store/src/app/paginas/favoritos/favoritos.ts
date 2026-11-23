import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarjetaProducto } from '../../compartido/componentes/tarjeta-producto/tarjeta-producto';
import { FavoritosService } from '../../nucleo/servicios/favoritos.service';
import { ModalProductoService } from '../../nucleo/servicios/modal-producto.service';

@Component({
  imports: [RouterLink, TarjetaProducto],
  selector: 'app-favoritos',
  styleUrl: './favoritos.css',
  templateUrl: './favoritos.html',
})
export class Favoritos {
  private readonly favoritosService = inject(FavoritosService);

  readonly productos = this.favoritosService.productos;
  readonly modal = inject(ModalProductoService);
}