export interface Marca {
  /** Identificador en minúsculas; es el que guarda Producto.marca. */
  id: string;
  nombre: string;
  logo: string;
  descripcion: string;
  paisOrigen: string;
  /** Si aparece en "Marcas destacadas" del Inicio. */
  destacada: boolean;
}
