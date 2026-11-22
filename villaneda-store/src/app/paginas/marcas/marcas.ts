import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../nucleo/servicios/productos.service';

@Component({
  selector: 'app-marcas',
  imports: [RouterLink],
  templateUrl: './marcas.html',
  styleUrl: './marcas.css',
})
export class Marcas {
  private readonly productos = inject(ProductosService);
  protected readonly marcas = this.productos.obtenerMarcas();

  protected cantidad(idMarca: string): number {
    return this.productos.contarPorMarca(idMarca);
  }
}
