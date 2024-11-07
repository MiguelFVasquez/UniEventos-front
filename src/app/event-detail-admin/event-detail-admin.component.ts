import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';

import { Evento } from '../models/evento'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { EventoService } from '../servicios/evento-service.service';
import { MensajeDTO } from '../models/mensaje-dto';

@Component({
  selector: 'app-event-detail-admin',
  standalone: true,
  templateUrl: './event-detail-admin.component.html',
  imports: [CommonModule],
  styleUrls: ['./event-detail-admin.component.css']
})
export class EventDetailAdminComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Obtener el ID del evento desde la ruta
    const id = this.route.snapshot.paramMap.get('id'); // Asegúrate de usar 'id'
    if (id) {
      this.obtenerEvento(id); // Llamar a la función para obtener el evento
    } else {
      console.error('ID del evento no encontrado en la ruta');
    }
  }

  obtenerEvento(id: string): void {
    this.eventoService.getEventoById(id).subscribe(
      (data: Evento) => {
        // Convierte la fecha al tipo Date para asegurar la visualización correcta
        this.evento = {
          ...data,
          fecha: new Date(data.fecha) // convierte la fecha recibida a un objeto Date
        };
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }

  eliminarEvento(): void {
    // Mostrar confirmación antes de eliminar
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este evento?");
    if (!confirmacion) {
      return; // Si el usuario cancela, salimos del método
    }
  
    // Intentar eliminar el evento si se confirma
    if (this.evento.id) {
      this.eventoService.eliminarEvento(this.evento.id).subscribe(
        (response: MensajeDTO) => {
          console.log('Respuesta del servidor:', response.respuesta);
          alert(response.respuesta); // Muestra el mensaje de confirmación al usuario
          // Redirige o actualiza la vista según lo necesario
          this.router.navigate(['/admin/dashboard/events']); // Ajusta la ruta si deseas redirigir después
        },
        (error) => {
          console.error('Error al eliminar el evento:', error);
          alert('Hubo un problema al intentar eliminar el evento. Por favor, intenta nuevamente.');
        }
      );
    } else {
      console.error('No se ha encontrado un ID válido para eliminar el evento');
    }
  }
  
  
  
  actualizarEvento(){}
  generarReporteWeb(){}
}
