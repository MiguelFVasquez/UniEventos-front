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
    this.evento.localidades.push({ nombre: '', capacidadMaxima: 0, precio: 0 });
  }
  
  eliminarLocalidad(index: number) {
    this.evento.localidades.splice(index, 1);
  }

  guardarEvento() {
    // Lógica para guardar el evento
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
