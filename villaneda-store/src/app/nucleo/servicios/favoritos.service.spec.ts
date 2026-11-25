import { TestBed } from '@angular/core/testing';
import { signal, computed } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FavoritosService } from './favoritos.service';
import { AuthService } from './auth.service';
import { AlmacenamientoService } from './almacenamiento.service';
import { ProductosService } from './productos.service';
import { Producto } from '../../compartido/modelos/producto';
import { CLAVE_FAVORITOS } from '../../compartido/constantes/almacenamiento';

describe('FavoritosService', () => {
  const usuario1 = {
    nombre: 'Usuario 1',
    correo: 'usuario1@example.com',
  };

  const usuario2 = {
    nombre: 'Usuario 2',
    correo: 'usuario2@example.com',
  };

  const producto1 = { id: 'reloj-1' } as Producto;
  const producto2 = { id: 'reloj-2' } as Producto;
  const producto3 = { id: 'reloj-3' } as Producto;

  const catalogo = [producto1, producto2, producto3];

  const usuarioActual = signal<{
    nombre: string;
    correo: string;
  } | null>(null);

  let datosGuardados: Record<string, string[]> | undefined;

  const autenticacion = {
    usuario: usuarioActual,
    estaAutenticado: computed(() => usuarioActual() !== null),
  };

  const almacenamiento = {
    leer: vi.fn((_clave: string, defecto: unknown) => {
      return datosGuardados ?? defecto;
    }),

    guardar: vi.fn(
      (_clave: string, valor: Record<string, string[]>) => {
        datosGuardados = valor;
      }
    ),
  };

  const productosService = {
    obtenerPorId: vi.fn((id: string) => {
      return catalogo.find((producto) => producto.id === id);
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    datosGuardados = undefined;
    usuarioActual.set(usuario1);

    TestBed.configureTestingModule({
      providers: [
        FavoritosService,
        {
          provide: AuthService,
          useValue: autenticacion,
        },
        {
          provide: AlmacenamientoService,
          useValue: almacenamiento,
        },
        {
          provide: ProductosService,
          useValue: productosService,
        },
      ],
    });
  });

  it('debe iniciar sin favoritos', () => {
    const servicio = TestBed.inject(FavoritosService);

    expect(servicio.productos()).toEqual([]);
  });

  it('debe agregar un producto a favoritos', () => {
    const servicio = TestBed.inject(FavoritosService);

    expect(servicio.alternar(producto1)).toBe(true);
    expect(servicio.esFavorito(producto1.id)).toBe(true);
    expect(servicio.productos()).toEqual([producto1]);
  });

  it('debe quitar un favorito al seleccionarlo nuevamente', () => {
    const servicio = TestBed.inject(FavoritosService);

    servicio.alternar(producto1);
    servicio.alternar(producto1);

    expect(servicio.esFavorito(producto1.id)).toBe(false);
    expect(servicio.productos()).toEqual([]);
  });

  it('no debe permitir guardar favoritos sin iniciar sesion', () => {
    const servicio = TestBed.inject(FavoritosService);

    usuarioActual.set(null);

    expect(servicio.alternar(producto1)).toBe(false);
    expect(servicio.productos()).toEqual([]);
    expect(almacenamiento.guardar).not.toHaveBeenCalled();
  });

  it('debe cambiar y guardar el orden de los favoritos', () => {
    const servicio = TestBed.inject(FavoritosService);

    servicio.alternar(producto1);
    servicio.alternar(producto2);
    servicio.alternar(producto3);

    servicio.reordenar(0, 2);

    expect(servicio.productos()).toEqual([
      producto2,
      producto3,
      producto1,
    ]);

    expect(almacenamiento.guardar).toHaveBeenLastCalledWith(
      CLAVE_FAVORITOS,
      {
        [usuario1.correo]: [
          producto2.id,
          producto3.id,
          producto1.id,
        ],
      }
    );
  });

  it('debe mantener favoritos independientes por usuario', () => {
    const servicio = TestBed.inject(FavoritosService);

    servicio.alternar(producto1);
    servicio.alternar(producto2);

    usuarioActual.set(usuario2);

    expect(servicio.productos()).toEqual([]);

    servicio.alternar(producto3);

    expect(servicio.productos()).toEqual([producto3]);

    usuarioActual.set(usuario1);

    expect(servicio.productos()).toEqual([
      producto1,
      producto2,
    ]);
  });

  it('debe recuperar los favoritos guardados y su orden', () => {
    datosGuardados = {
      [usuario1.correo]: [
        producto3.id,
        producto1.id,
        producto2.id,
      ],
    };

    const servicio = TestBed.inject(FavoritosService);

    expect(servicio.productos()).toEqual([
      producto3,
      producto1,
      producto2,
    ]);
  });

  it('debe ocultar los favoritos al cerrar sesion', () => {
    const servicio = TestBed.inject(FavoritosService);

    servicio.alternar(producto1);

    usuarioActual.set(null);

    expect(servicio.productos()).toEqual([]);
    expect(servicio.esFavorito(producto1.id)).toBe(false);

    usuarioActual.set(usuario1);

    expect(servicio.productos()).toEqual([producto1]);
  });
});