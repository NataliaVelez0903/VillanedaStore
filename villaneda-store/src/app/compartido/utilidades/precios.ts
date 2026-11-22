import { Producto } from '../modelos/producto';

/** Precio que paga el cliente: aplica el descuento y redondea a la centena. */
export function calcularPrecioFinal(producto: Producto): number {
  const descuento = producto.descuentoPorcentaje ?? 0;
  const precio = producto.precio * (1 - descuento / 100);
  return Math.round(precio / 100) * 100;
}
