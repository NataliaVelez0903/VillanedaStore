import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionService } from '../../nucleo/servicios/notificacion.service';
import { NotificacionToast } from './notificacion-toast';

describe('NotificacionToast', () => {
  let fixture: ComponentFixture<NotificacionToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [NotificacionToast] }).compileComponents();
    fixture = TestBed.createComponent(NotificacionToast);
    await fixture.whenStable();
  });

  it('debe mostrar el mensaje del servicio', async () => {
    TestBed.inject(NotificacionService).mostrar('Hola', 'exito');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Hola');
  });
});
