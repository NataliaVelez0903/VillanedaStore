import { Component, inject } from '@angular/core';
import { ConsentimientoCookiesService } from '../../nucleo/servicios/consentimiento-cookies.service';

@Component({
  selector: 'app-banner-cookies',
  templateUrl: './banner-cookies.html',
  styleUrl: './banner-cookies.css',
})
export class BannerCookies {
  protected readonly consentimiento = inject(ConsentimientoCookiesService);
}
