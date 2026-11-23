import { Articulo } from '../modelos/articulo';

export const ARTICULOS: Articulo[] = [
  {
    id: 'cuarzo-vs-automatico',
    titulo: 'Cuarzo o automático: ¿cuál te conviene?',
    resumen: 'Diferencias de precisión, mantenimiento y precio entre los dos mecanismos más comunes.',
    contenido:
      'Un reloj de cuarzo funciona con pila y un cristal que vibra a una frecuencia fija, por eso es muy preciso y casi no necesita mantenimiento. Un automático se carga con el movimiento de tu muñeca; es menos preciso, pero muchos lo prefieren por su mecánica y porque no depende de baterías. Si buscas algo práctico para el día a día, el cuarzo es la opción segura; si te interesa la relojería tradicional, prueba un automático.',
    fecha: '2026-10-28',
    autor: 'Equipo Villaneda',
    categoria: 'Guías',
    imagen: 'img/blog/cuarzo-automatico.png',
  },
  {
    id: 'cuidar-correa-cuero',
    titulo: 'Cómo cuidar una correa de cuero',
    resumen: 'Hábitos sencillos para que tu correa dure años sin agrietarse ni perder color.',
    contenido:
      'Evita mojarla y, si se humedece, déjala secar a temperatura ambiente, nunca con secador. Límpiala con un paño seco y aplica crema para cuero cada pocos meses. Alterna el uso con otra correa para que descanse y guárdala lejos del sol directo.',
    fecha: '2026-10-12',
    autor: 'Equipo Villaneda',
    categoria: 'Cuidado',
    imagen: 'img/blog/correa-cuero.png',
  },
  {
    id: 'resistencia-agua',
    titulo: 'Qué significa “resistente al agua 50 m”',
    resumen: 'La cifra no indica la profundidad a la que puedes bucear. Te explicamos cómo leerla.',
    contenido:
      'La resistencia en metros es una prueba de presión en laboratorio, no una profundidad real. 30 m soporta salpicaduras; 50 m permite lavarse las manos y nadar de forma ocasional; 100 m sirve para natación frecuente; para buceo busca 200 m o la certificación ISO 6425.',
    fecha: '2026-09-30',
    autor: 'Equipo Villaneda',
    categoria: 'Guías',
    imagen: 'img/blog/resistencia-agua.png',
  },
  {
    id: 'reloj-segun-ocasion',
    titulo: 'El reloj ideal para cada ocasión',
    resumen: 'Deportivo, casual o de vestir: claves para combinar tu reloj con tu estilo.',
    contenido:
      'Para eventos formales elige esferas limpias y correa de cuero o malla fina. En el día a día funciona un reloj de acero con esfera legible. Para entrenar, un deportivo digital con cronómetro y buena resistencia al agua es la mejor opción.',
    fecha: '2026-09-15',
    autor: 'Equipo Villaneda',
    categoria: 'Estilo',
    imagen: 'img/blog/ocasion.png',
  },
];
