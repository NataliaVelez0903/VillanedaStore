export type CategoriaReloj =
  | 'hombre'
  | 'mujer'
  | 'deportivo'
  | 'unisex';

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: CategoriaReloj;
  esNuevo: boolean;
  descuentoPorcentaje?: number;
}