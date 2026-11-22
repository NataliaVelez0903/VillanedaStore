import { Producto } from '../modelos/producto';

/** Precio con el descuento aplicado, redondeado al peso. */
export function calcularPrecioFinal(producto: Producto): number {
  const descuento = producto.descuentoPorcentaje ?? 0;
  return Math.round(producto.precio * (1 - descuento / 100));
}

export function tieneDescuento(producto: Producto): boolean {
  return (producto.descuentoPorcentaje ?? 0) > 0;
}
