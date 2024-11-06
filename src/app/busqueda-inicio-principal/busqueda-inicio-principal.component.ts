import { Component } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';
import { EventoService } from '../servicios/evento.service';
import { FiltroEventoDTO } from '../models/filtro-evento-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { ItemEventoDTO } from '../models/item-evento-dto';

@Component({
  selector: 'app-busqueda-inicio-principal',
  standalone: true,
  imports: [HeaderInicioPrincipalComponent,EventCardComponent,RouterModule, ReactiveFormsModule],
  templateUrl: './busqueda-inicio-principal.component.html',
  styleUrl: './busqueda-inicio-principal.component.css'
})
export class BusquedaInicioPrincipalComponent {

  listaEventosDisponibles:ItemEventoDTO[] = [];
  filtroForm!: FormGroup;
  tipos: string[];

  constructor(private authService:AuthService, private eventoService:EventoService, private formBuilder: FormBuilder){
    this.obtenerEventosDisponibles(); 
    this.crearFormulario();
    this.tipos = [];
    this.obtenerTipos();
  }

  public crearFormulario(){
    this.filtroForm = this.formBuilder.group({
      nombre: [""],
      tipo: [""],
      ciudad: ["Armenia"]
    });
  }

  public obtenerEventosDisponibles(){
    this.authService.listarTodosEventosDisponibles().subscribe({
      next: (data) => {
        this.listaEventosDisponibles = data.respuesta;
      }
    })
  }

  public obtenerTipos(){
    this.authService.getTipos().subscribe({
      next: (data) => {
        this.tipos = data.respuesta;
      }
    });
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

}
