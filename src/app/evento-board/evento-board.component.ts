import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemEventoDTO } from '../models/item-evento-dto';
import { Router } from '@angular/router';
import { EventoService } from '../servicios/evento-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearEventoDialogComponent } from '../crear-evento-dialog/crear-evento-dialog.component';

@Component({
  selector: 'app-evento-board',
  standalone: true,
  imports: [EventCardComponent,RouterModule,CommonModule],
  templateUrl: './evento-board.component.html',
  styleUrl: './evento-board.component.css'

})
export class EventoBoardComponent implements OnInit {
  listaEventosDisponibles:any[] = [];
  listaEventosNoDisponibles:any[] = [];

  paginaActualDisponibles = 0;
  paginaActualNoDisponibles = 0;
  size=3;
  totalPaginasDisponibles = 1; // Actualizar con el valor real desde el backend
  totalPaginasNoDisponibles = 1; // Actualizar con el valor real desde el backend

  constructor(private eventService: EventoService, private router: Router,private dialog: MatDialog ) {
    this.cargarEventosDisponibles();
    this.cargarEventosNoDisponibles();
  }
  ngOnInit(): void {
    this.cargarEventosDisponibles();
    this.cargarEventosNoDisponibles();
  }

  agregarEvento() {
    this.dialog.open(CrearEventoDialogComponent, {
      width: '90%',
      disableClose: false,
      maxWidth: '800px'
    });  }
  // Método para cambiar de página en eventos disponibles
  cambiarPaginaDisponibles(direccion: number) {
  this.paginaActualDisponibles += direccion;
  this.cargarEventosDisponibles();
  }

  // Método para cambiar de página en eventos no disponibles
  cambiarPaginaNoDisponibles(direccion: number) {
    this.paginaActualNoDisponibles += direccion;
    this.cargarEventosNoDisponibles();
  }

  // Métodos para cargar los eventos de cada página (simulados aquí)
  cargarEventosDisponibles() {
    this.eventService.getEventosActivos(this.paginaActualDisponibles,this.size).subscribe(data =>{
      this.listaEventosDisponibles=data.content;
      this.totalPaginasDisponibles=data.totalPages;
    });
  }

  cargarEventosNoDisponibles() {
    this.eventService.getEventosInactivos(this.paginaActualDisponibles,this.size).subscribe(data =>{
      this.listaEventosNoDisponibles=data.content;
      this.totalPaginasDisponibles=data.totalPages;
  });
  }

  //------------capturar input para saber cuando se hace click sobre un evento----------
    // Método para manejar el clic en un evento
  // Método que navega a la página de detalles del evento
  onEventCardClick(eventId: string) {
    this.router.navigate([`/admin/dashboard/events/detail/${eventId}`]);
  }
  


}