import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ARTICULOS } from '../../compartido/datos/articulos.data';

@Component({
  selector: 'app-blog',
  imports: [DatePipe],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  /** Del más reciente al más antiguo. */
  protected readonly articulos = [...ARTICULOS].sort((a, b) => b.fecha.localeCompare(a.fecha));
  protected readonly abierto = signal<string | null>(null);

  protected alternar(id: string): void {
    this.abierto.update((actual) => (actual === id ? null : id));
  }
}
