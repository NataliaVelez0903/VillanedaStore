export interface Articulo {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  /** Fecha en formato ISO (AAAA-MM-DD). */
  fecha: string;
  autor: string;
  categoria: string;
  imagen: string;
}
