import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../nucleo/servicios/auth.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-iniciar-sesion',
  styleUrl: './iniciar-sesion.css',
  templateUrl: './iniciar-sesion.html',
})
export class IniciarSesion {
  private readonly constructorFormulario = inject(FormBuilder);
  private readonly autenticacion = inject(AuthService);
  private readonly router = inject(Router);

  readonly ingresando = signal(false);
  readonly mensajeError = signal('');

  readonly formulario = this.constructorFormulario.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
    recordar: [false],
  });

  async iniciarSesion(): Promise<void> {
    if (this.ingresando()) return;

    this.mensajeError.set('');

    this.formulario.patchValue({
      correo: this.formulario.controls.correo.value.trim(),
    });

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const urlActual = this.router.parseUrl(this.router.url);
    const volver = urlActual.queryParamMap.get('volver');
    const destino = volver === '/favoritos' ? '/favoritos' : '/inicio';

    this.ingresando.set(true);

    try {
      const { correo, contrasena, recordar } = this.formulario.getRawValue();

      const accesoCorrecto = await this.autenticacion.iniciarSesion(
        correo,
        contrasena,
        recordar,
      );

      if (!accesoCorrecto) {
        this.mensajeError.set('El correo o la contraseña son incorrectos.');
        return;
      }

      await this.router.navigateByUrl(destino);
    } catch {
      this.mensajeError.set(
        'No pudimos iniciar sesión. Inténtalo de nuevo.',
      );
    } finally {
      this.ingresando.set(false);
    }
  }
}