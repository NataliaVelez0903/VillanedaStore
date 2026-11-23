import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BannerCookies } from './layout/banner-cookies/banner-cookies';
import { Footer } from './layout/footer/footer';
import { ModalProducto } from './layout/modal-producto/modal-producto';
import { Navbar } from './layout/navbar/navbar';
import { NotificacionToast } from './layout/notificacion-toast/notificacion-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Navbar, Footer, ModalProducto, NotificacionToast, BannerCookies],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
