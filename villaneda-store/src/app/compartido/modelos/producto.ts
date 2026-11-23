export type CategoriaReloj = 'hombre' | 'mujer' | 'deportivo' | 'unisex';

/** Filtros del catálogo: una categoría o "nuevos". */
export type FiltroCategoria = CategoriaReloj | 'nuevos';

export interface Producto {
  id: string;
  nombre: string;
  /** Id de la marca (ver Marca.id). */
  marca: string;
  descripcion: string;
  /** Precio antes de descuento, en pesos colombianos. */
  precio: number;
  calificacion: number;
  opiniones: number;
  imagen: string;
  categoria: CategoriaReloj;
  esNuevo: boolean;
  descuentoPorcentaje?: number;
}
