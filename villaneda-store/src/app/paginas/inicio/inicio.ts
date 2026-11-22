import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CATEGORIAS } from '../../compartido/datos/categorias.data';
import { Producto } from '../../compartido/modelos/producto';
import { calcularPrecioFinal } from '../../compartido/utilidades/precios';
import { ModalProductoService } from '../../nucleo/servicios/modal-producto.service';
import { ProductosService } from '../../nucleo/servicios/productos.service';

interface Slide {
  titulo1: string;
  titulo2: string;
  lema: string;
  texto: string;
  imagen: string;
}

interface Beneficio {
  icono: string;
  titulo: string;
  texto: string;
}

const INTERVALO_CARRUSEL_MS = 5000;

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit, OnDestroy {
  private readonly productos = inject(ProductosService);
  private readonly modal = inject(ModalProductoService);
  private temporizador?: Subscription;

  // El primer slide es el del mockup; los otros dos usan la misma estructura.
  protected readonly slides: Slide[] = [
    {
      titulo1: 'RELOJES QUE',
      titulo2: 'DEFINEN TU TIEMPO',
      lema: 'TU ESTILO, TU MOMENTO.',
      texto: 'Descubre nuestra colección de relojes originales con estilo, calidad y garantía.',
      imagen: 'img/hero.png',
    },
    {
      titulo1: 'NUEVA',
      titulo2: 'COLECCIÓN',
      lema: 'ACERO Y ELEGANCIA.',
      texto: 'Llegaron los modelos más recientes de nuestras marcas.',
      imagen: 'img/hero.png',
    },
    {
      titulo1: 'OFERTAS',
      titulo2: 'DE TEMPORADA',
      lema: 'APROVECHA AHORA.',
      texto: 'Descuentos en referencias seleccionadas por tiempo limitado.',
      imagen: 'img/hero.png',
    },
  ];
  protected readonly actual = signal(0);

  protected readonly categorias = CATEGORIAS;
  protected readonly marcas = this.productos.obtenerMarcas().filter((marca) => marca.destacada).slice(0, 5);
  protected readonly ofertas = this.productos.obtenerDestacados();
  protected readonly beneficios: Beneficio[] = [
    { icono: 'img/beneficio-original.png', titulo: 'PRODUCTOS ORIGINALES', texto: 'Todos nuestros relojes son 100% originales' },
    { icono: 'img/beneficio-envio.png', titulo: 'ENVÍOS A TODO EL PAÍS', texto: 'Entregas rápidas y seguras' },
    { icono: 'img/beneficio-garantia.png', titulo: 'GARANTÍA', texto: 'Garantía de 3 meses en todos los productos' },
  ];

  protected readonly precioFinal = calcularPrecioFinal;

  ngOnInit(): void {
    this.iniciarCarrusel();
  }

  ngOnDestroy(): void {
    this.detenerCarrusel();
  }

  protected iniciarCarrusel(): void {
    this.detenerCarrusel();
    // Si el usuario pidió menos movimiento en su sistema, el carrusel no avanza solo.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.temporizador = interval(INTERVALO_CARRUSEL_MS).subscribe(() => this.siguiente(false));
  }

  protected detenerCarrusel(): void {
    this.temporizador?.unsubscribe();
    this.temporizador = undefined;
  }

  protected irA(indice: number): void {
    this.actual.set(indice);
    this.iniciarCarrusel();
  }

  protected siguiente(reiniciar = true): void {
    this.actual.update((i) => (i + 1) % this.slides.length);
    if (reiniciar) {
      this.iniciarCarrusel();
    }
  }

  protected anterior(): void {
    this.actual.update((i) => (i - 1 + this.slides.length) % this.slides.length);
    this.iniciarCarrusel();
  }

  protected nombreMarca(id: string): string {
    return this.productos.nombreMarca(id);
  }

  protected verOferta(producto: Producto): void {
    this.modal.abrir(producto);
  }
}
