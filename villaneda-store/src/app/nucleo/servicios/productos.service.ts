import { Injectable } from '@angular/core';
import { MARCAS } from '../../compartido/datos/marcas.data';
import { PRODUCTOS } from '../../compartido/datos/productos.data';
import { Marca } from '../../compartido/modelos/marca';
import { FiltroCategoria, Producto } from '../../compartido/modelos/producto';
import { calcularPrecioFinal } from '../../compartido/utilidades/precios';

export type OrdenCatalogo = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre';

export interface FiltrosCatalogo {
  categoria?: FiltroCategoria;
  marca?: string;
  busqueda?: string;
  orden?: OrdenCatalogo;
}

/** Productos que aparecen en "Ofertas destacadas" del Inicio (igual que el mockup). */
const IDS_DESTACADOS = ['curren-8023', 'salco-ips', 'gforce-h4482', 'qq-c10a047y'];

/**
 * Única fuente de datos de productos y marcas.
 * Los componentes nunca leen los arreglos directamente: siempre pasan por aquí.
 */
@Injectable({ providedIn: 'root' })
export class ProductosService {
  private readonly productos: Producto[] = PRODUCTOS;
  private readonly marcas: Marca[] = MARCAS;

  obtenerTodos(): Producto[] {
    return this.productos;
  }

  obtenerPorId(id: string): Producto | undefined {
    return this.productos.find((producto) => producto.id === id);
  }

  obtenerDestacados(): Producto[] {
    return IDS_DESTACADOS
      .map((id) => this.obtenerPorId(id))
      .filter((producto): producto is Producto => producto !== undefined);
  }

  /** Productos con descuento, del mayor al menor descuento. */
  obtenerOfertas(): Producto[] {
    return this.productos
      .filter((producto) => (producto.descuentoPorcentaje ?? 0) > 0)
      .sort((a, b) => (b.descuentoPorcentaje ?? 0) - (a.descuentoPorcentaje ?? 0));
  }

  obtenerMarcas(): Marca[] {
    return this.marcas;
  }

  obtenerMarca(id: string): Marca | undefined {
    return this.marcas.find((marca) => marca.id === id);
  }

  nombreMarca(id: string): string {
    return this.obtenerMarca(id)?.nombre ?? id;
  }

  contarPorMarca(idMarca: string): number {
    return this.productos.filter((producto) => producto.marca === idMarca).length;
  }

  filtrar(filtros: FiltrosCatalogo): Producto[] {
    const busqueda = filtros.busqueda?.trim().toLowerCase() ?? '';

    const resultado = this.productos.filter((producto) => {
      const cumpleCategoria = this.cumpleCategoria(producto, filtros.categoria);
      const cumpleMarca = !filtros.marca || producto.marca === filtros.marca;
      const cumpleBusqueda =
        !busqueda ||
        producto.nombre.toLowerCase().includes(busqueda) ||
        this.nombreMarca(producto.marca).toLowerCase().includes(busqueda);
      return cumpleCategoria && cumpleMarca && cumpleBusqueda;
    });

    return this.ordenar(resultado, filtros.orden ?? 'relevancia');
  }

  private cumpleCategoria(producto: Producto, categoria?: FiltroCategoria): boolean {
    if (!categoria) {
      return true;
    }
    if (categoria === 'nuevos') {
      return producto.esNuevo;
    }
    return producto.categoria === categoria;
  }

  private ordenar(lista: Producto[], orden: OrdenCatalogo): Producto[] {
    const copia = [...lista];
    switch (orden) {
      case 'precio-asc':
        return copia.sort((a, b) => calcularPrecioFinal(a) - calcularPrecioFinal(b));
      case 'precio-desc':
        return copia.sort((a, b) => calcularPrecioFinal(b) - calcularPrecioFinal(a));
      case 'nombre':
        return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
      default:
        return copia;
    }
  }
}
