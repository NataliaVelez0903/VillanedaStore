import { Routes } from '@angular/router';
import { authGuard } from './nucleo/guards/auth.guard';
import { invitadoGuard } from './nucleo/guards/invitado.guard';

const titulo = (pagina: string) => `${pagina} | Villaneda Store`;

/** Todas las páginas se cargan bajo demanda (lazy loading). */
export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    title: 'Villaneda Store | Relojes que definen tu tiempo',
    loadComponent: () => import('./paginas/inicio/inicio').then((m) => m.Inicio),
  },
  {
    path: 'relojes',
    title: titulo('Relojes'),
    loadComponent: () => import('./paginas/catalogo/catalogo').then((m) => m.Catalogo),
  },
  {
    path: 'marcas',
    title: titulo('Marcas'),
    loadComponent: () => import('./paginas/marcas/marcas').then((m) => m.Marcas),
  },
  {
    path: 'ofertas',
    title: titulo('Ofertas'),
    loadComponent: () => import('./paginas/ofertas/ofertas').then((m) => m.Ofertas),
  },
  {
    path: 'blog',
    title: titulo('Blog'),
    loadComponent: () => import('./paginas/blog/blog').then((m) => m.Blog),
  },
  {
    path: 'contacto',
    title: titulo('Contacto'),
    loadComponent: () => import('./paginas/contacto/contacto').then((m) => m.Contacto),
  },
  {
    path: 'registro',
    title: titulo('Crear cuenta'),
    canActivate: [invitadoGuard],
    loadComponent: () => import('./paginas/cuenta/registro/registro').then((m) => m.Registro),
  },
  {
    path: 'iniciar-sesion',
    title: titulo('Iniciar sesión'),
    canActivate: [invitadoGuard],
    loadComponent: () =>
      import('./paginas/cuenta/iniciar-sesion/iniciar-sesion').then((m) => m.IniciarSesion),
  },
  {
    path: 'favoritos',
    title: titulo('Mis favoritos'),
    canActivate: [authGuard],
    loadComponent: () => import('./paginas/favoritos/favoritos').then((m) => m.Favoritos),
  },
  
  {
     path: 'carrito',
     title: titulo('Carrito'),
     loadComponent: () => import('./paginas/carrito/carrito').then((m) => m.Carrito),
  },
  {
    path: '**',
    title: titulo('Página no encontrada'),
    loadComponent: () =>
      import('./paginas/pagina-no-encontrada/pagina-no-encontrada').then((m) => m.PaginaNoEncontrada),
  },
];
