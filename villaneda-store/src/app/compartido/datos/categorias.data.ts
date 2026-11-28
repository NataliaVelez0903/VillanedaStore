import { FiltroCategoria } from '../modelos/producto';

export interface CategoriaMenu {
  slug: FiltroCategoria;
  nombre: string;
  imagen: string;
}

/** Categorías del menú y de "Categorías principales" en el Inicio. */
export const CATEGORIAS: CategoriaMenu[] = [
  { slug: 'hombre', nombre: 'Hombre', imagen: 'img/categorias/cat-hombre.png' },
  { slug: 'mujer', nombre: 'Mujer', imagen: 'img/categorias/cat-mujer.png' },
  { slug: 'deportivo', nombre: 'Deportivos', imagen: 'img/categorias/cat-deportivos.png' },
  { slug: 'nuevos', nombre: 'Nuevos', imagen: 'img/categorias/cat-nuevos.png' },
];
