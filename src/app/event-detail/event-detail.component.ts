import { Component, OnInit } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';
import { ActivatedRoute,Router  } from '@angular/router';
import { Evento } from '../models/evento'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { EventoService } from '../servicios/evento-service.service';
import { MensajeDTO }  from '../models/mensaje-dto';
import { AuthService } from '../servicios/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})

export class EventDetailComponent implements OnInit{
  evento: Evento= {
    id: '',
    nombre: '', 
    descripcion: '',
    direccion: '',
    ciudad: '',
    fecha: new Date,
    estado: '',
    tipo: '',
    imagenPortada: '',
    imagenLocalidades: '',
    localidades: [],
    promedioCalificaciones: 0
  }
  constructor(  private route: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router,
    private authService: AuthService){
  
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Asegúrate de usar 'id'
    if (id) {
      this.obtenerEvento(id); // Llamar a la función para obtener el evento
    } else {
      console.error('ID del evento no encontrado en la ruta');
    }  
  }
  obtenerEvento(id: string): void { 
    this.authService.getEventoById(id).subscribe(
      (data: Evento) => {
        // Convierte la fecha al tipo Date para asegurar la visualización correcta
        this.evento = {
          ...data,
          fecha: new Date(data.fecha) // Asegura que la fecha se convierta a un objeto Date
        };
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }
}
