import { Component } from '@angular/core';
  import { CrearEvento } from '../models/CrearEvento';
  import { EventoService } from '../servicios/evento-service.service';
  import { AuthService } from '../servicios/auth.service';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-event-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './editar-event-dialog.component.html',
  styleUrl: './editar-event-dialog.component.css'
})
export class EditarEventDialogComponent {
  evento: CrearEvento = {
    nombre: '',
    descripcion: '',
    direccion: '',
    ciudad: '',
    fecha: new Date(),
    tipo: '',
    imagenPortada: '',
    imagenLocalidades: '',
    localidades: [],
    imagenPortadaFile: undefined, // Inicializar como opcional
    imagenLocalidadesFile: undefined // Inicializar como opcional
  };
  

  tipoEventos:string[];
  constructor(private eventService:EventoService, private authService: AuthService,private dialogRef: MatDialogRef<EditarEventDialogComponent>){
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
    const imagenPortada = this.evento.imagenPortadaFile;
    const imagenLocalidades = this.evento.imagenLocalidadesFile;
    const eventId = localStorage.getItem('selectedEventId') ?? ''; // Valor por defecto vacío

    if (!imagenPortada || !imagenLocalidades) {
      alert('Debes seleccionar ambas imágenes antes de guardar el evento.');
      return;
    }
    this.evento.fecha = this.convertirFechaAObjetoDate(this.evento.fecha);
  // Asegúrate de formatear la fecha antes de enviarla al backend (si es necesario)
    const fechaFormateada = this.formatFecha(this.evento.fecha);
  // Si la fecha tiene que ser un objeto Date, conviértela de nuevo antes de la asignación
    this.evento.fecha = new Date(fechaFormateada);  // Esto convierte la fecha string a un objeto Date  
    this.eventService.updateEvento(eventId,this.evento, imagenPortada, imagenLocalidades).subscribe({
      next: (response) => {
        console.log(response);
        alert(response.respuesta); // Mostrar mensaje de éxito
        this.cerrarDialog(); // Cerrar el diálogo después de guardar
      },
      error: (error) => {
        console.error('Error al guardar el evento:', error);
        alert('Error al guardar el evento. Por favor, intenta nuevamente.');
      },
    });
  }
  
  
  
  // Convertir una imagen en base64 a un archivo
  private dataURLtoFile(dataURL: string, fileName: string): File {
    const arr = dataURL.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
  
    if (!mimeMatch) {
      throw new Error('Formato de DataURL no válido');
    }
  
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], fileName, { type: mime });
  }
 
  onFileSelected(event: Event, tipo: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      if (tipo === 'portada') {
        this.evento.imagenPortadaFile = file; // Asigna el archivo seleccionado
      } else if (tipo === 'localidades') {
        this.evento.imagenLocalidadesFile = file; // Asigna el archivo seleccionado
      }
    }
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
