import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { contrasenasCoinciden } from '../../../nucleo/validadores/contrasenas-coinciden';

@Component({
  imports: [],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private readonly constructorFormulario = inject(FormBuilder); //obtiene la herramienta de Angular para construir formularios.

  readonly formulario = this.constructorFormulario.nonNullable.group(// group reúne los cuatro campos en un formulario.
    {
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],//'' indica que cada campo comienza vacío.
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', Validators.required],
    },
    {
      validators: contrasenasCoinciden(
        'contrasena',
        'confirmarContrasena',
      ),
    },
  );
}