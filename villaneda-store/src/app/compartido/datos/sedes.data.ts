import { Sede } from '../modelos/sede';

/**
 * Sedes de la tienda. Direcciones y teléfonos son de ejemplo;
 * las coordenadas sí corresponden a cada sector de la ciudad.
 */
export const SEDES: Sede[] = [
  {
    id: 'manizales',
    nombre: 'Villaneda Manizales',
    ciudad: 'Manizales',
    direccion: 'Cra. 23 #63-15, El Cable',
    telefono: '+57 606 885 1200',
    horario: 'Lun a sáb 9:00 a.m. – 7:00 p.m.',
    coordenadas: { latitud: 5.0563, longitud: -75.4905 },
  },
  {
    id: 'pereira',
    nombre: 'Villaneda Pereira',
    ciudad: 'Pereira',
    direccion: 'Cra. 7 #18-21, Centro',
    telefono: '+57 606 335 4410',
    horario: 'Lun a sáb 9:00 a.m. – 7:00 p.m.',
    coordenadas: { latitud: 4.8133, longitud: -75.6961 },
  },
  {
    id: 'medellin',
    nombre: 'Villaneda Medellín',
    ciudad: 'Medellín',
    direccion: 'Cra. 43A #7-50, El Poblado',
    telefono: '+57 604 444 2310',
    horario: 'Lun a sáb 10:00 a.m. – 8:00 p.m.',
    coordenadas: { latitud: 6.2088, longitud: -75.568 },
  },
  {
    id: 'bogota',
    nombre: 'Villaneda Bogotá',
    ciudad: 'Bogotá',
    direccion: 'Cl. 93 #13-24, Chicó',
    telefono: '+57 601 742 8800',
    horario: 'Lun a sáb 10:00 a.m. – 8:00 p.m.',
    coordenadas: { latitud: 4.6766, longitud: -74.048 },
  },
];
