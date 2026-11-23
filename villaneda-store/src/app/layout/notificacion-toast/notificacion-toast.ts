import { Component, inject } from '@angular/core';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';

@Component({
  selector: 'app-notificacion-toast',
  templateUrl: './notificacion-toast.html',
  styleUrl: './notificacion-toast.css',
})
export class NotificacionToast {
  protected readonly notificacion = inject(NotificacionService);
}
