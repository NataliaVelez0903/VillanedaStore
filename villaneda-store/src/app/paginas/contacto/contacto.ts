import { DecimalPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Sede, SedeCercana } from '../../compartido/modelos/sede';
import { ErrorUbicacion, GeolocalizacionService } from '../../nucleo/servicios/geolocalizacion.service';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';

type CampoContacto = 'nombre' | 'correo' | 'telefono' | 'asunto' | 'mensaje';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  private readonly fb = inject(FormBuilder);
  private readonly geo = inject(GeolocalizacionService);
  private readonly notificacion = inject(NotificacionService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly asuntos = ['Información de un producto', 'Estado de mi pedido', 'Garantía', 'Otro'];

  // ---------- Sedes y geolocalización ----------
  protected readonly sedes = this.geo.obtenerSedes();
  protected readonly seleccionada = signal<Sede>(this.sedes[0]);
  protected readonly cercana = signal<SedeCercana | null>(null);
  protected readonly buscando = signal(false);
  protected readonly errorUbicacion = signal<string | null>(null);

  /** El iframe necesita una URL marcada como segura; solo se construye con coordenadas propias. */
  protected readonly urlMapa = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.geo.urlMapa(this.seleccionada().coordenadas)),
  );

  // ---------- Formulario ----------
  protected readonly formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern(/^[0-9+\s-]{7,15}$/)]],
    asunto: [this.asuntos[0], Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    aceptaDatos: [false, Validators.requiredTrue],
  });

  protected campoInvalido(campo: CampoContacto | 'aceptaDatos'): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  protected enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.notificacion.mostrar('Revisa los campos marcados.', 'error');
      return;
    }
    const nombre = this.formulario.controls.nombre.value.split(' ')[0];
    this.notificacion.mostrar(`Gracias, ${nombre}. Te responderemos pronto.`, 'exito');
    this.formulario.reset();
  }

  protected buscarSedeCercana(): void {
    this.buscando.set(true);
    this.errorUbicacion.set(null);

    this.geo
      .obtenerUbicacion()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (coordenadas) => {
          const resultado = this.geo.sedeMasCercana(coordenadas);
          this.cercana.set(resultado);
          this.seleccionada.set(resultado.sede);
          this.buscando.set(false);
        },
        error: (error: ErrorUbicacion) => {
          this.errorUbicacion.set(this.geo.mensajeDeError(error));
          this.buscando.set(false);
        },
      });
  }

  /** Alternativa manual cuando el usuario no da permiso de ubicación. */
  protected elegirSede(id: string): void {
    const sede = this.sedes.find((s) => s.id === id);
    if (sede) {
      this.seleccionada.set(sede);
    }
  }

  protected urlComoLlegar(sede: Sede): string {
    const { latitud, longitud } = sede.coordenadas;
    return `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`;
  }
}
