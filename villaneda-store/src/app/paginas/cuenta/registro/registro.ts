import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../nucleo/servicios/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { contrasenasCoinciden } from '../../../nucleo/validadores/contrasenas-coinciden';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
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
  private readonly autenticacion = inject(AuthService);
  readonly guardando = signal(false);
  readonly mensajeExito = signal('');
  readonly mensajeError = signal('');


  async registrar(): Promise<void> {
  if (this.guardando()) return;

  this.mensajeExito.set('');
  this.mensajeError.set('');

  this.formulario.patchValue({
    nombre: this.formulario.controls.nombre.value.trim(),
    correo: this.formulario.controls.correo.value.trim(),
  });

  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  this.guardando.set(true);

  try {
    const { nombre, correo, contrasena } = this.formulario.getRawValue();

    const resultado = await this.autenticacion.registrar({
      nombre,
      correo,
      contrasena,
    });

    if (resultado.exito) {
      this.mensajeExito.set(resultado.mensaje);
      this.formulario.reset();
    } else {
      this.mensajeError.set(resultado.mensaje);
    }
  } catch {
    this.mensajeError.set(
      'No pudimos crear la cuenta. Inténtalo de nuevo.',
    );
  } finally {
    this.guardando.set(false);
  }
}
}