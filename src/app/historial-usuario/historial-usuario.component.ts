import { Component, OnInit } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';
import { CommonModule } from '@angular/common';
import { OrdenService } from '../servicios/orden.service';
import { HistorialCardComponent } from '../historial-card/historial-card.component';
import { ItemOrdenDTO } from '../models/ItemOrdenDTO';

@Component({
  selector: 'app-historial-usuario',
  standalone: true,
  imports: [CommonModule, HistorialCardComponent],
  templateUrl: './historial-usuario.component.html',
  styleUrls: ['./historial-usuario.component.css']
})
export class HistorialUsuarioComponent implements OnInit {
  historial: ItemOrdenDTO[] = []; // Lista vacía por defecto
  mensaje: string | null = null; // Mensaje a mostrar si no hay historial
  idUsuario: string = ''; // Inicializado como cadena vacía
  tieneHistorial: boolean = false; // Variable para controlar la existencia de historial

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.idUsuario = localStorage.getItem('idUser') || '';
    this.obtenerHistorial();
  }

  obtenerHistorial(): void {
    this.ordenService.obtenerHistorial(this.idUsuario).subscribe({
      next: (response) => {
        if (!response.error && Array.isArray(response.respuesta) && response.respuesta.length > 0) {
          this.historial = response.respuesta.map((item) => ({
            ...item,
            fecha1: this.parseFecha(item.fecha1), // Parsear la fecha adecuadamente
          }));
          this.tieneHistorial = true; // Si hay historial, se ajusta la variable
          this.mensaje = null;
        } else {
          this.mensaje = 'No has realizado ninguna compra.';
          this.tieneHistorial = false; // Si no hay historial, se ajusta la variable
        }
      },
      error: (err) => {
        console.error('Error en la petición:', err);
        this.mensaje = 'No se pudo obtener el historial. Intenta nuevamente más tarde.';
        this.tieneHistorial = false; // Si hay error en la petición, también ajustamos
      },
    });
  }

  private parseFecha(fecha: any): Date {
    try {
      if (typeof fecha === 'string') {
        return new Date(fecha.replace(/,/g, '-'));
      }
      return new Date(fecha);
    } catch (e) {
      console.error('Fecha inválida:', fecha);
      return new Date(); // Retornar la fecha actual si la conversión falla
    }
  }
}
