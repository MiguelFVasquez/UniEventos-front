import { Component, OnInit } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';
import { ActivatedRoute,Router  } from '@angular/router';
import { Evento } from '../models/evento'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { EventoService } from '../servicios/evento-service.service';
import { MensajeDTO }  from '../models/mensaje-dto';
import { AuthService } from '../servicios/auth.service';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../servicios/shared-service.service';
import { CarritoDTO } from '../models/carritoDTO';
import { CarritoService } from '../servicios/carrito.service';

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
  idCarrito:string= '';
  idCuenta: string='';

  constructor(  private route: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private carritoService: CarritoService){
      this.idCarrito= this.sharedService.getCarritoId();
      this.idCuenta= this.sharedService.getUserId();
  }

  obtenerId(){

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Asegúrate de usar 'id'
    if (id) {
      this.obtenerEvento(id); // Llamar a la función para obtener el evento
    } else {
      console.error('ID del evento no encontrado en la ruta');
    }  
    this.idCarrito= this.sharedService.getCarritoId();
    this.idCuenta= this.sharedService.getUserId();
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

  agregarAlCarrito(eventId: string, cantidad: number, nombreLocalidad: string) {
    const carritoDTO: CarritoDTO = {
      idEvento: eventId,
      idCarrito: this.idCarrito,
      nuevaCantidad: cantidad,
      nLocalidad: nombreLocalidad
    };
    console.log('id carrito ', this.idCarrito)
    console.log('nombre localidad ',nombreLocalidad);

    this.carritoService.agregarEventoCarrito(carritoDTO).subscribe(
      (response) => {
        console.log(response.respuesta); // Confirmación de que el item fue agregado
        alert("Evento agregado al carrito con exito: \n" + response.respuesta)
      },
      (error) => {
        console.error('Error al agregar el evento al carrito:', error);
        alert("Ha habido un problema a la hora de agregar el evento al carrito" )
      }
    );
  }



}
