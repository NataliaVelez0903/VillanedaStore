/** Punto en el mapa (grados decimales). */
export interface Coordenadas {
  latitud: number;
  longitud: number;
}

export interface Sede {
  id: string;
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  horario: string;
  coordenadas: Coordenadas;
}

/** Resultado de buscar la sede más cercana al usuario. */
export interface SedeCercana {
  sede: Sede;
  distanciaKm: number;
}
