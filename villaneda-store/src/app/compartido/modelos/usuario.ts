/** Usuario guardado en localStorage. */
export interface Usuario {
  nombre: string;
  correo: string;
  contrasenaHash: string;
}

/** Datos públicos del usuario con sesión iniciada. */
export interface UsuarioSesion {
  nombre: string;
  correo: string;
}

export interface DatosRegistro {
  nombre: string;
  correo: string;
  contrasena: string;
}
