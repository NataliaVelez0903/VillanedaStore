import { Marca } from '../modelos/marca';

const RUTA_LOGOS = 'img/marcas/';

export const MARCAS: Marca[] = [
  {
    id: 'curren',
    nombre: 'Curren',
    paisOrigen: 'China',
    logo: `${RUTA_LOGOS}curren.png`,
    destacada: true,
    descripcion: 'Relojes de cuarzo con diseño robusto y cronógrafos a precio accesible.',
  },
  {
    id: 'qq',
    nombre: 'Q&Q',
    paisOrigen: 'Japón',
    logo: `${RUTA_LOGOS}qq.png`,
    destacada: true,
    descripcion: 'Marca del grupo Citizen: relojes confiables, livianos y de uso diario.',
  },
  {
    id: 'g-force',
    nombre: 'G-Force',
    paisOrigen: 'Colombia',
    logo: `${RUTA_LOGOS}gforce.png`,
    destacada: true,
    descripcion: 'Relojes deportivos digitales y análogos con resistencia al agua.',
  },
  {
    id: 'salco',
    nombre: 'Salco',
    paisOrigen: 'Colombia',
    logo: `${RUTA_LOGOS}salco.png`,
    destacada: true,
    descripcion: 'Estilo clásico y moderno para hombre y mujer, con garantía nacional.',
  },
  {
    id: 'elite',
    nombre: 'Elite',
    paisOrigen: 'Colombia',
    logo: `${RUTA_LOGOS}elite.png`,
    destacada: true,
    descripcion: 'Línea premium con acabados en acero, cristal mineral y detalles dorados.',
  },
];