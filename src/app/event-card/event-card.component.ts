import { CommonModule } from '@angular/common';
import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
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

  constructor() { }

  ngOnInit(): void { }
}
