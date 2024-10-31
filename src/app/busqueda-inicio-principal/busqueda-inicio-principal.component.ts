import { Component } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';
import { EventoService } from '../servicios/evento.service';

@Component({
  selector: 'app-busqueda-inicio-principal',
  standalone: true,
  imports: [HeaderInicioPrincipalComponent,EventCardComponent,RouterModule],
  templateUrl: './busqueda-inicio-principal.component.html',
  styleUrl: './busqueda-inicio-principal.component.css'
})
export class BusquedaInicioPrincipalComponent {

listaEventosDisponibles = []; /* = [
    {
      nombre: 'Festival de Música',
      descripcion: 'Un evento lleno de música y diversión.',
      fecha: '2024-11-05',
      ciudad: 'Bogotá',
      imagenPortada: 'assets/musica1.jpg'
    },
    {
      nombre: 'Carrera de 5K',
      descripcion: 'Una carrera para los amantes del running.',
      fecha: '2024-10-15',
      ciudad: 'Medellín',
      imagenPortada: 'assets/carrera.jpg'
    },
    {
      nombre: 'Festival de Tatuajes',
      descripcion: 'Una evento para dar a conocer los tatuadores del eje',
      fecha: '2024-11-15',
      ciudad: 'Armenia',
      imagenPortada: 'assets/tatuajes.jpg'
    },
    {
      nombre: 'Fuck NEWS',
      descripcion: 'Stand up de comedia',
      fecha: '2024-10-15',
      ciudad: 'Medellín',
      imagenPortada: 'assets/fucknews.jpg'
    }
  ];*/

  constructor(private eventoService:EventoService){
    this.listarEventos(); 
  }

  public listarEventos(){
    this.eventoService.listarTodosEventos().subscribe({
      next: (data) => {
        this.listaEventosDisponibles = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
