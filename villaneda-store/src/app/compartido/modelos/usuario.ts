export interface DatosRegistro {
  nombre: string;
  correo: string;
  contrasena: string;
}

export interface Usuario {
  nombre: string;
  correo: string;
  contrasenaHash: string;
}

export interface UsuarioSesion {
  nombre: string;
  correo: string;
}