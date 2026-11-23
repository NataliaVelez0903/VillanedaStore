import { Pipe, PipeTransform } from '@angular/core';

const FORMATO_COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

/**
 * Muestra un número como precio colombiano: 109900 -> "$109.900".
 * Uso en el HTML: {{ producto.precio | precio }}
 */
@Pipe({ name: 'precio' })
export class PrecioPipe implements PipeTransform {
  transform(valor: number): string {
    return FORMATO_COP.format(valor).replace(/\s/g, '');
  }
}