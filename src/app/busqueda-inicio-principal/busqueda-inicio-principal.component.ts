import { Component } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';
import { EventoService } from '../servicios/evento-service.service';
import { FiltroEventoDTO } from '../models/filtro-evento-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicios/auth.service';
import { ItemEventoDTO } from '../models/item-evento-dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-busqueda-inicio-principal',
  standalone: true,
  imports: [HeaderInicioPrincipalComponent,EventCardComponent,RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './busqueda-inicio-principal.component.html',
  styleUrl: './busqueda-inicio-principal.component.css'
})
export class BusquedaInicioPrincipalComponent {
  listaEventosDisponibles:ItemEventoDTO[] = [];
  paginaActualDisponibles = 0;
  paginaActualNoDisponibles = 0;
  size=3;
  totalPaginasDisponibles = 1; // Actualizar con el valor real desde el backend
  totalPaginasNoDisponibles = 1; // Actualizar con el valor real desde el backend
  filtroForm!: FormGroup;
  tipos: string[];
  constructor(private authService:AuthService, 
              private eventoService:EventoService,
              private router: Router,
              private formBuilder: FormBuilder){
    this.listarEventos(); 
    this.crearFormulario();
    this.tipos = [];
    this.obtenerTipos();
  }
  
  public obtenerTipos(){
    this.authService.getTipos().subscribe({
      next: (data) => {
        this.tipos = data.respuesta;
      }
    });
  }
  public crearFormulario(){
    this.filtroForm = this.formBuilder.group({
      nombre: [""],
      tipo: [""],
      ciudad: ["Armenia"]
    });
  }

  listarEventos(){
    this.authService.getEventosActivos(this.paginaActualDisponibles,this.size).subscribe(data =>{
      console.log(data.content);  
      this.listaEventosDisponibles=data.content;
      this.totalPaginasDisponibles=data.totalPages;
    });
  }

  cambiarPaginaDisponibles(direccion: number) {
    this.paginaActualDisponibles += direccion;
    this.listarEventos();
  }
  public filtrarEventos(){

    const filtroEve = this.filtroForm.value as FiltroEventoDTO;

    this.eventoService.filtrarEventos(filtroEve).subscribe({
      next: (data) => {
        this.listaEventosDisponibles = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onEventCardClick(eventId: string) {
    this.router.navigate([`/event-detail/${eventId}`]);
  }

}
