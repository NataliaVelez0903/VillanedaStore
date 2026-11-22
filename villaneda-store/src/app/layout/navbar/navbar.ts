import { Component, computed, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CATEGORIAS } from '../../compartido/datos/categorias.data';
import { AuthService } from '../../nucleo/servicios/auth.service';
import { CarritoService } from '../../nucleo/servicios/carrito.service';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';
import { ProductosService } from '../../nucleo/servicios/productos.service';

type Submenu = 'relojes' | 'marcas';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly notificacion = inject(NotificacionService);
  protected readonly auth = inject(AuthService);
  protected readonly carrito = inject(CarritoService);

  protected readonly categorias = CATEGORIAS;
  protected readonly marcas = inject(ProductosService).obtenerMarcas();

  protected readonly menuAbierto = signal(false);
  protected readonly submenuAbierto = signal<Submenu | null>(null);

  protected readonly primerNombre = computed(() => this.auth.usuario()?.nombre.split(' ')[0] ?? '');
  protected readonly etiquetaCarrito = computed(() => {
    const cantidad = this.carrito.cantidadTotal();
    return `Carrito, ${cantidad} ${cantidad === 1 ? 'producto' : 'productos'}`;
  });

  constructor() {
    // Al cambiar de página se cierran el menú móvil y los submenús.
    this.router.events
      .pipe(
        filter((evento) => evento instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.cerrarTodo());
  }

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
    this.submenuAbierto.set(null);
  }

  protected alternarSubmenu(nombre: Submenu): void {
    this.submenuAbierto.update((actual) => (actual === nombre ? null : nombre));
  }

  protected buscar(evento: Event, campo: HTMLInputElement): void {
    evento.preventDefault();
    const texto = campo.value.trim();
    if (!texto) {
      campo.focus();
      return;
    }
    this.router.navigate(['/relojes'], { queryParams: { busqueda: texto } });
    campo.value = '';
  }

  protected salir(): void {
    this.auth.cerrarSesion();
    this.notificacion.mostrar('Cerraste sesión. ¡Vuelve pronto!', 'info');
    this.router.navigate(['/inicio']);
  }

  @HostListener('document:keydown.escape')
  protected cerrarTodo(): void {
    this.menuAbierto.set(false);
    this.submenuAbierto.set(null);
  }
}
