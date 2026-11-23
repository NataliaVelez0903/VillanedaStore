import { Component, computed, input } from '@angular/core';

const TOTAL_ESTRELLAS = 5;

/** Muestra una calificación de 0 a 5 con estrellas (acepta medias). */
@Component({
  selector: 'app-estrellas',
  template: `
    <span class="estrellas" role="img" [attr.aria-label]="'Calificación ' + calificacion() + ' de 5'">
      @for (tipo of tipos(); track $index) {
        <span [class]="tipo" aria-hidden="true">★</span>
      }
    </span>
  `,
  styles: `
    .estrellas { letter-spacing: 2px; }
    .llena { color: var(--color-primary); }
    .media { background: linear-gradient(90deg, var(--color-primary) 50%, #555 50%); background-clip: text; color: transparent; }
    .vacia { color: #555; }
  `,
})
export class Estrellas {
  readonly calificacion = input.required<number>();

  protected readonly tipos = computed(() =>
    Array.from({ length: TOTAL_ESTRELLAS }, (_, i) => {
      const valor = this.calificacion() - i;
      if (valor >= 1) return 'llena';
      return valor >= 0.5 ? 'media' : 'vacia';
    }),
  );
}