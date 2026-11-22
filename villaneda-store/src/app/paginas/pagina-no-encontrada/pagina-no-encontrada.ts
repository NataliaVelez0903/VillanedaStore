import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-no-encontrada',
  imports: [RouterLink],
  templateUrl: './pagina-no-encontrada.html',
  styleUrl: './pagina-no-encontrada.css',
})
export class PaginaNoEncontrada {
  private readonly location = inject(Location);

  protected volver(): void {
    this.location.back();
  }
}
