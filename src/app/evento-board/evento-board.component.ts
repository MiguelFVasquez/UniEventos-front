import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemEventoDTO } from '../models/item-evento-dto';

@Component({
  selector: 'app-evento-board',
  standalone: true,
  imports: [EventCardComponent,RouterModule,CommonModule],
  templateUrl: './evento-board.component.html',
  styleUrl: './evento-board.component.css'

})
export class EventoBoardComponent implements OnInit {
  listaEventosDisponibles = [
    {
      nombre: 'Festival de Música',
      descripcion: 'Un evento lleno de música y diversión.',
      fecha: '2024-11-05',
      ciudad: 'Bogotá',
      imagenPortada: 'assets/imagenCover.jpeg'
    },
    {
      nombre: 'Carrera de 5K',
      descripcion: 'Una carrera para los amantes del running.',
      fecha: '2024-10-15',
      ciudad: 'Medellín',
      imagenPortada: 'assets/imagenCover.jpeg'
    },
    {
      nombre: 'Festival de Tatuajes',
      descripcion: 'Una evento para dar a conocer los tatuadores del eje',
      fecha: '2024-11-15',
      ciudad: 'Armenia',
      imagenPortada: 'assets/imagenCover.jpeg'
    },
    {
      nombre: 'Fuck NEWS',
      descripcion: 'Stand up de comedia',
      fecha: '2024-10-15',
      ciudad: 'Medellín',
      imagenPortada: 'assets/imagenCover.jpeg'
    }
  ];

  listaEventosNoDisponibles = [
    {
      nombre: 'Concierto Rock',
      descripcion: 'Un concierto de rock inolvidable.',
      fecha: '2024-09-20',
      ciudad: 'Cali',
      imagenPortada: 'assets/imagenCover.jpeg'
    },
    {
      nombre: 'Feria Gastronómica',
      descripcion: 'Degustación de platos de todo el mundo.',
      fecha: '2024-08-10',
      ciudad: 'Cartagena',
      imagenPortada: 'assets/imagenCover.jpeg'
    }
  ];

  eventosFiltradosDisponibles = [...this.listaEventosDisponibles];
  eventosFiltradosNoDisponibles = [...this.listaEventosNoDisponibles];

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    // Aquí podrías realizar una solicitud a un servicio para cargar eventos desde el backend
  }

  agregarEvento() {
    // Lógica para agregar un evento
  }

  filtrarEventos(event: any) {
    const filtro = event.target.value.toLowerCase();

    this.eventosFiltradosDisponibles = this.listaEventosDisponibles.filter(evento =>
      evento.nombre.toLowerCase().includes(filtro) || 
      evento.descripcion.toLowerCase().includes(filtro)
    );

    this.eventosFiltradosNoDisponibles = this.listaEventosNoDisponibles.filter(evento =>
      evento.nombre.toLowerCase().includes(filtro) || 
      evento.descripcion.toLowerCase().includes(filtro)
    );
  }
}