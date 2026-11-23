import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PrecioPipe } from '../../compartido/pipes/precio-pipe';
import { calcularPrecioFinal } from '../../compartido/utilidades/precios';
import { AuthService } from '../../nucleo/servicios/auth.service';
import { CarritoService } from '../../nucleo/servicios/carrito.service';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';

/** Página del carrito: lista de productos, cantidades, total y finalizar compra. */
@Component({
  imports: [RouterLink, PrecioPipe],
  selector: 'app-carrito',
  styleUrl: './carrito.css',
  templateUrl: './carrito.html',
})
export class Carrito {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notificaciones = inject(NotificacionService);
  protected readonly carrito = inject(CarritoService);

  /** Se expone la función para usarla en el HTML: precioFinal(item.producto). */
  protected readonly precioFinal = calcularPrecioFinal;

  finalizarCompra(): void {
    if (!this.auth.estaAutenticado()) {
      this.notificaciones.mostrar('Inicia sesión para finalizar tu compra.', 'info');
      this.router.navigate(['/iniciar-sesion'], { queryParams: { volver: '/carrito' } });
      return;
    }
    this.carrito.vaciar();
    this.notificaciones.mostrar('¡Pedido realizado! Te enviaremos la confirmación por correo.', 'exito');
    this.router.navigate(['/inicio']);
  }
}