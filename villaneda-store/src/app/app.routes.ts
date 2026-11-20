import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  {
    path: 'inicio',
    loadComponent: () =>
      import('./paginas/inicio/inicio').then(m => m.Inicio),
  },
  {
    path: 'relojes',
    loadComponent: () =>
      import('./paginas/catalogo/catalogo').then(m => m.Catalogo),
  },
  {
    path: 'marcas',
    loadComponent: () =>
      import('./paginas/marcas/marcas').then(m => m.Marcas),
  },
  {
    path: 'ofertas',
    loadComponent: () =>
      import('./paginas/ofertas/ofertas').then(m => m.Ofertas),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./paginas/blog/blog').then(m => m.Blog),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./paginas/contacto/contacto').then(m => m.Contacto),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./paginas/cuenta/registro/registro').then(m => m.Registro),
  },
  {
    path: 'iniciar-sesion',
    loadComponent: () =>
      import('./paginas/cuenta/iniciar-sesion/iniciar-sesion')
        .then(m => m.IniciarSesion),
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./paginas/favoritos/favoritos').then(m => m.Favoritos),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./paginas/pagina-no-encontrada/pagina-no-encontrada')
        .then(m => m.PaginaNoEncontrada),
  },
];