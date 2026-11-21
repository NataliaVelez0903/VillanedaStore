import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEDES } from '../../compartido/datos/sedes.data';
import { Coordenadas, Sede, SedeCercana } from '../../compartido/modelos/sede';

export type ErrorUbicacion = 'no-soportado' | 'permiso-denegado' | 'no-disponible' | 'tiempo-agotado';

const RADIO_TIERRA_KM = 6371;
const TIEMPO_ESPERA_MS = 10000;

const MENSAJES_ERROR: Record<ErrorUbicacion, string> = {
  'no-soportado': 'Tu navegador no permite obtener la ubicación.',
  'permiso-denegado': 'No diste permiso para usar tu ubicación. Puedes elegir tu ciudad en la lista.',
  'no-disponible': 'No pudimos determinar tu ubicación. Revisa que el GPS o la red estén activos.',
  'tiempo-agotado': 'La ubicación tardó demasiado en responder. Inténtalo de nuevo.',
};

/** Obtiene la ubicación del usuario y calcula la sede más cercana. */
@Injectable({ providedIn: 'root' })
export class GeolocalizacionService {
  /**
   * Envuelve la API del navegador en un Observable:
   * emite las coordenadas una vez y se completa, o emite un ErrorUbicacion.
   */
  obtenerUbicacion(): Observable<Coordenadas> {
    return new Observable<Coordenadas>((suscriptor) => {
      if (!('geolocation' in navigator)) {
        suscriptor.error('no-soportado' satisfies ErrorUbicacion);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          suscriptor.next({ latitud: posicion.coords.latitude, longitud: posicion.coords.longitude });
          suscriptor.complete();
        },
        (error) => suscriptor.error(this.traducirError(error)),
        { enableHighAccuracy: false, timeout: TIEMPO_ESPERA_MS, maximumAge: 300000 },
      );
    });
  }

  mensajeDeError(error: ErrorUbicacion): string {
    return MENSAJES_ERROR[error];
  }

  obtenerSedes(): Sede[] {
    return SEDES;
  }

  sedeMasCercana(origen: Coordenadas): SedeCercana {
    return SEDES
      .map((sede) => ({ sede, distanciaKm: this.distanciaKm(origen, sede.coordenadas) }))
      .reduce((cercana, actual) => (actual.distanciaKm < cercana.distanciaKm ? actual : cercana));
  }

  /** Fórmula de Haversine: distancia en línea recta entre dos puntos del planeta. */
  distanciaKm(a: Coordenadas, b: Coordenadas): number {
    const aRadianes = (grados: number) => (grados * Math.PI) / 180;
    const dLat = aRadianes(b.latitud - a.latitud);
    const dLon = aRadianes(b.longitud - a.longitud);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(aRadianes(a.latitud)) * Math.cos(aRadianes(b.latitud)) * Math.sin(dLon / 2) ** 2;
    return 2 * RADIO_TIERRA_KM * Math.asin(Math.sqrt(h));
  }

  /** URL del mapa de OpenStreetMap centrado en un punto (para un iframe). */
  urlMapa(punto: Coordenadas): string {
    const margen = 0.01;
    const caja = [
      punto.longitud - margen,
      punto.latitud - margen,
      punto.longitud + margen,
      punto.latitud + margen,
    ].join(',');
    return `https://www.openstreetmap.org/export/embed.html?bbox=${caja}&layer=mapnik&marker=${punto.latitud},${punto.longitud}`;
  }

  private traducirError(error: GeolocationPositionError): ErrorUbicacion {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'permiso-denegado';
      case error.TIMEOUT:
        return 'tiempo-agotado';
      default:
        return 'no-disponible';
    }
  }
}
