import { Component } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';
import { EventoService } from '../servicios/evento.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-busqueda-inicio-principal',
  standalone: true,
  imports: [HeaderInicioPrincipalComponent,EventCardComponent,RouterModule, CommonModule],
  templateUrl: './busqueda-inicio-principal.component.html',
  styleUrl: './busqueda-inicio-principal.component.css'
})
export class BusquedaInicioPrincipalComponent {
  listaEventosDisponibles:any[] = [];
  paginaActualDisponibles = 0;
  paginaActualNoDisponibles = 0;
  size=4;
  totalPaginasDisponibles = 1; // Actualizar con el valor real desde el backend
  totalPaginasNoDisponibles = 1; // Actualizar con el valor real desde el backend

  constructor(private authService:AuthService){}
  
  ngOnInit(): void {
    this.listarEventos();
  }


  listarEventos(){
    this.authService.getEventosActivos(this.paginaActualDisponibles,this.size).subscribe(data =>{
      console.log(data);  
      this.listaEventosDisponibles=data.content;
      this.totalPaginasDisponibles=data.totalPages;
    });
  }

  cambiarPaginaDisponibles(direccion: number) {
    this.paginaActualDisponibles += direccion;
    this.listarEventos();
  }

}
