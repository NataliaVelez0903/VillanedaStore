import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CLAVE_USUARIOS,
  COOKIE_RECORDAR_CORREO,
  COOKIE_SESION,
} from '../../compartido/constantes/almacenamiento';
import { DatosRegistro, Usuario, UsuarioSesion } from '../../compartido/modelos/usuario';
import { AlmacenamientoService } from './almacenamiento.service';
import { ConsentimientoCookiesService } from './consentimiento-cookies.service';
import { CookiesService } from './cookies.service';

export interface ResultadoRegistro {
  exito: boolean;
  mensaje: string;
}

const DIAS_SESION_RECORDADA = 7;
const DIAS_RECORDAR_CORREO = 30;

/**
 * Registro, inicio y cierre de sesión.
 * - Los usuarios se guardan en localStorage (contraseña cifrada con SHA-256).
 * - La sesión se mantiene con la cookie "vs_sesion".
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly almacenamiento = inject(AlmacenamientoService);
  private readonly cookies = inject(CookiesService);
  private readonly consentimiento = inject(ConsentimientoCookiesService);

  private readonly sesion = signal<UsuarioSesion | null>(this.recuperarSesion());

  readonly usuario = this.sesion.asReadonly();
  readonly estaAutenticado = computed(() => this.sesion() !== null);

  async registrar(datos: DatosRegistro): Promise<ResultadoRegistro> {
    const correo = datos.correo.trim().toLowerCase();
    const usuarios = this.obtenerUsuarios();

    if (usuarios.some((usuario) => usuario.correo === correo)) {
      return { exito: false, mensaje: 'Ya existe una cuenta con ese correo.' };
    }

    const nuevo: Usuario = {
      nombre: datos.nombre.trim(),
      correo,
      contrasenaHash: await this.cifrar(datos.contrasena),
    };
    this.almacenamiento.guardar(CLAVE_USUARIOS, [...usuarios, nuevo]);
    return { exito: true, mensaje: 'Cuenta creada. Ya puedes iniciar sesión.' };
  }

  /** Devuelve true si el correo y la contraseña coinciden con un usuario registrado. */
  async iniciarSesion(correoIngresado: string, contrasena: string, recordar: boolean): Promise<boolean> {
    const correo = correoIngresado.trim().toLowerCase();
    const usuario = this.buscarUsuario(correo);
    if (!usuario || usuario.contrasenaHash !== (await this.cifrar(contrasena))) {
      return false;
    }

    // Cookie de sesión: si marca "recordarme" dura 7 días; si no, se borra al cerrar el navegador.
    this.cookies.guardar(COOKIE_SESION, usuario.correo, recordar ? DIAS_SESION_RECORDADA : undefined);
    this.actualizarCorreoRecordado(usuario.correo, recordar);
    this.sesion.set({ nombre: usuario.nombre, correo: usuario.correo });
    return true;
  }

  cerrarSesion(): void {
    this.cookies.eliminar(COOKIE_SESION);
    this.sesion.set(null);
  }

  /** Correo guardado en la cookie "recordar correo" (para rellenar el login). */
  correoRecordado(): string {
    if (!this.consentimiento.preferenciasPermitidas()) {
      return '';
    }

    return this.cookies.leer(COOKIE_RECORDAR_CORREO) ?? '';
  }

  olvidarCorreo(): void {
    this.cookies.eliminar(COOKIE_RECORDAR_CORREO);
  }

  private actualizarCorreoRecordado(correo: string, recordar: boolean): void {
    if (recordar && this.consentimiento.preferenciasPermitidas()) {
      this.cookies.guardar(COOKIE_RECORDAR_CORREO, correo, DIAS_RECORDAR_CORREO);
    } else {
      this.cookies.eliminar(COOKIE_RECORDAR_CORREO);
    }
  }

  private recuperarSesion(): UsuarioSesion | null {
    const correo = this.cookies.leer(COOKIE_SESION);
    const usuario = correo ? this.buscarUsuario(correo) : undefined;
    return usuario ? { nombre: usuario.nombre, correo: usuario.correo } : null;
  }

  private buscarUsuario(correo: string): Usuario | undefined {
    return this.obtenerUsuarios().find((usuario) => usuario.correo === correo);
  }

  private obtenerUsuarios(): Usuario[] {
    return this.almacenamiento.leer<Usuario[]>(CLAVE_USUARIOS, []);
  }

  /** Convierte la contraseña en un hash SHA-256 para no guardarla en texto plano. */
  private async cifrar(texto: string): Promise<string> {
    const bytes = new TextEncoder().encode(texto);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}
