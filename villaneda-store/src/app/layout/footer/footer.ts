import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentimientoCookiesService } from '../../nucleo/servicios/consentimiento-cookies.service';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';

interface RedSocial {
  nombre: string;
  url: string;
  /** Trazo del ícono SVG (viewBox 0 0 24 24). */
  icono: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private readonly consentimiento = inject(ConsentimientoCookiesService);
  private readonly notificacion = inject(NotificacionService);

  protected readonly anio = new Date().getFullYear();

  protected readonly redes: RedSocial[] = [
    {
      nombre: 'Instagram',
      url: 'https://www.instagram.com/',
      icono: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5h.01',
    },
    {
      nombre: 'Facebook',
      url: 'https://www.facebook.com/',
      icono: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z',
    },
    {
      nombre: 'TikTok',
      url: 'https://www.tiktok.com/',
      icono: 'M14 3v11a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 5',
    },
    {
      nombre: 'WhatsApp',
      url: 'https://www.whatsapp.com/',
      icono: 'M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1zm5-11c0 3.5 2.5 6 6 6l1-1.5-2-1-1 1c-1.2-.5-2-1.3-2.5-2.5l1-1-1-2L9 9z',
    },
  ];

  /** Borra la decisión de cookies para que el banner vuelva a aparecer. */
  protected abrirPreferenciasCookies(): void {
    this.consentimiento.restablecer();
    this.notificacion.mostrar('Elige de nuevo tus preferencias de cookies.', 'info');
  }
}
