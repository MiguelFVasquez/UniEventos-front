import { Component } from '@angular/core';
import { CrearEvento } from '../models/CrearEvento';
import { EventoService } from '../servicios/evento-service.service';
import { AuthService } from '../servicios/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-crear-evento-dialog',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './crear-evento-dialog.component.html',
  styleUrl: './crear-evento-dialog.component.css'
})
export class CrearEventoDialogComponent {
  evento: CrearEvento = {
    nombre: '',
    descripcion: '',
    direccion: '',
    ciudad: '',
    fecha: new Date(),
    tipo: '',
    imagenPortada: '',
    imagenLocalidades: '',
    localidades: []
  };
  tipoEventos:string[];
  constructor(private eventService:EventoService, private authService: AuthService,private dialogRef: MatDialogRef<CrearEventoDialogComponent>){
    this.tipoEventos = [];
    this.obtenerTipos();
  }

  public obtenerTipos(){
    this.authService.getTipos().subscribe({
      next: (data) => {
        this.tipoEventos = data.respuesta;
      }
    });
  }
  agregarLocalidad() {
    this.evento.localidades.push({ nombre: '', capacidadMaxima: 0, precio: 0 ,entradasVendidas:0});
  }
  
  eliminarLocalidad(index: number) {
    this.evento.localidades.splice(index, 1);
  }

  guardarEvento() {
    console.log('Nuevo Evento: ', this.evento);
    // Convierte la fecha si es necesario
    this.evento.fecha = this.convertirFechaAObjetoDate(this.evento.fecha);
    // Asegúrate de formatear la fecha antes de enviarla al backend (si es necesario)
    const fechaFormateada = this.formatFecha(this.evento.fecha);
    // Si la fecha tiene que ser un objeto Date, conviértela de nuevo antes de la asignación
    this.evento.fecha = new Date(fechaFormateada);  // Esto convierte la fecha string a un objeto Date
    this.eventService.crearEvento(this.evento).subscribe({
      next: (response) => {
        console.log(response.respuesta); // Puedes mostrar este mensaje en la UI si deseas
        alert(response.respuesta)
        this.cerrarDialog(); // Cerrar el diálogo después de guardar
      },
      error: (error) => {
        alert('Error al crear el evento, intentelo otra vez: '+ error);
        console.error('Error al guardar el evento:', error);
      }
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
  // Convierte una fecha string como "2024-11-25" a un objeto Date
  private convertirFechaAObjetoDate(fecha: string | Date): Date {
    if (typeof fecha === 'string') {
      return new Date(fecha);  // Convierte el string a Date
    }
    return fecha;  // Si ya es un objeto Date, lo retorna tal cual
  }
  
    // Método para formatear la fecha a LocalDateTime esperado por el backend
  private formatFecha(fecha: Date): string {
    // Usamos toISOString() y tomamos solo la parte de la fecha con la hora "00:00:00"
    const fechaISO = new Date(fecha).toISOString();
    return fechaISO.split('.')[0]; // Devuelve la fecha con formato "yyyy-MM-dd'T'HH:mm:ss"
  }
}
