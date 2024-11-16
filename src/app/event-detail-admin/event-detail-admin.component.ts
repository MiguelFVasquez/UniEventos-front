import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { Evento } from '../models/evento'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { EventoService } from '../servicios/evento-service.service';
import { MensajeDTO } from '../models/mensaje-dto';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CrearEventoDialogComponent } from '../crear-evento-dialog/crear-evento-dialog.component';
import { EditarEventDialogComponent } from '../editar-event-dialog/editar-event-dialog.component';
@Component({
  selector: 'app-event-detail-admin',
  standalone: true,
  templateUrl: './event-detail-admin.component.html',
  imports: [CommonModule],
  styleUrls: ['./event-detail-admin.component.css']
})
export class EventDetailAdminComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}
  
  ngOnInit(): void {
    // Obtener el ID del evento desde la ruta
    const id = this.route.snapshot.paramMap.get('id'); // Asegúrate de usar 'id'
    if (id) {
      this.obtenerEvento(id); // Llamar a la función para obtener el evento
    } else {
      console.error('ID del evento no encontrado en la ruta');
    }
  }
  

  obtenerEvento(id: string): void {
    this.eventoService.getEventoById(id).subscribe(
      (data: Evento) => {
        this.evento = {
          ...data,
          fecha: this.parseFecha(data.fecha) // Usa una función para manejar fechas
        };
      },
      (error) => {
        console.error('Error al obtener el evento:', error);
      }
    );
  }
  parseFecha(fecha: any): Date {
    const parsedDate = new Date(fecha);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate; // Retorna la fecha actual si es inválida
  }

  eliminarEvento(): void {
    // Mostrar confirmación antes de eliminar
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este evento?");
    if (!confirmacion) {
      return; // Si el usuario cancela, salimos del método
    }
  
    // Intentar eliminar el evento si se confirma
    if (this.evento.id) {
      this.eventoService.eliminarEvento(this.evento.id).subscribe(
        (response: MensajeDTO) => {
          console.log('Respuesta del servidor:', response.respuesta);
          alert(response.respuesta); // Muestra el mensaje de confirmación al usuario
          // Redirige o actualiza la vista según lo necesario
          this.router.navigate(['/admin/dashboard/events']); // Ajusta la ruta si deseas redirigir después
        },
        (error) => {
          console.error('Error al eliminar el evento:', error);
          alert('Hubo un problema al intentar eliminar el evento. Por favor, intenta nuevamente.');
        }
      );
    } else {
      console.error('No se ha encontrado un ID válido para eliminar el evento');
    }
  }

  actualizarEvento(eventoActualizado: any): void {
    const formData = new FormData();
  
    // Agregar el objeto evento como JSON dentro de FormData
    formData.append('evento', new Blob([JSON.stringify(eventoActualizado)], { type: 'application/json' }));
  
    // Agregar los archivos (si existen)
    const imagenPortadaFile = eventoActualizado.imagenPortadaFile || null;
    const imagenLocalidadesFile = eventoActualizado.imagenLocalidadesFile || null;
  
    // Llamada al servicio para actualizar el evento
    this.eventoService.updateEvento(
      this.evento.id,      // ID del evento
      eventoActualizado,   // Los datos del evento
      imagenPortadaFile,   // Imagen de portada (si existe)
      imagenLocalidadesFile // Imagen de localidades (si existe)
    ).subscribe({
      next: (response) => {
        this.showNotification(response.respuesta);
        this.obtenerEvento(this.evento.id); // Refresca los datos del evento
      },
      error: (error) => {
        console.error('Error al actualizar el evento:', error);
        alert('Hubo un problema al actualizar el evento. Por favor, intente nuevamente.');
      }
    });
  }
  
  

  abrirDialogEditarEvento(evento: any): void {
    const dialogRef = this.dialog.open(EditarEventDialogComponent, {
      data: { evento }, // Pasamos el evento actual como data
      width: '600px' // Ajusta el tamaño según lo necesario
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.actualizarEvento(result); // Actualizamos el evento con los nuevos datos
      }
    });
  }
  
  

  generarReporteWeb(){
    const eventoId = this.evento.id; // Obtén el ID del evento que quieres generar
    this.eventoService.generarReporteWeb(eventoId).subscribe({
      next: (response) => {
        // Generar el HTML del reporte con formato de documento
        let content = `
          <html>
            <head>
              <title>Reporte Web</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                .report-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f5f5f5; }
                h1 { text-align: center; color: #333; }
                .section-title { font-size: 18px; font-weight: bold; margin-top: 20px; }
                .data-item { margin: 10px 0; padding: 10px; border-bottom: 1px solid #ddd; }
                .data-item span { display: inline-block; font-weight: bold; width: 150px; color: #555; }
                .localidades-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                .localidades-table th, .localidades-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .localidades-table th { background-color: #f2f2f2; font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="report-container">
                <h1>Reporte de Evento</h1>`;
  
        // Iterar sobre el JSON y estructurarlo en HTML
        Object.entries(response).forEach(([key, value]) => {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  
          // Verificar si el valor es un array (asumiendo que representa las localidades)
          if (Array.isArray(value) && key.toLowerCase() === "localidades") {
            content += `
              <div class="data-item">
                <span>${formattedKey}:</span>
                <table class="localidades-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Entradas Vendidas</th>
                      <th>Capacidad Máxima</th>
                    </tr>
                  </thead>
                  <tbody>`;
  
            // Agregar cada localidad como una fila en la tabla
            value.forEach((localidad: any) => {
              content += `
                <tr>
                  <td>${localidad.nombre || ''}</td>
                  <td>${localidad.precio || ''}</td>
                  <td>${localidad.entradasVendidas || ''}</td>
                  <td>${localidad.capacidadMaxima || ''}</td>
                </tr>`;
            });
  
            content += `
                  </tbody>
                </table>
              </div>`;
          } else {
            // Mostrar el valor como texto si no es un array de localidades
            const displayValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
            content += `
              <div class="data-item">
                <span>${formattedKey}:</span> ${displayValue}
              </div>`;
          }
        });
  
        content += `
              </div>
            </body>
          </html>
        `;
  
        // Abrir la ventana emergente con el contenido formateado
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        if (newWindow) {
          newWindow.document.write(content);
          newWindow.document.close();
        } else {
          console.error("No se pudo abrir la ventana emergente. Revisa las configuraciones de pop-ups.");
        }
      },
      error: (error) => {
        console.error("Error al generar el reporte web:", error);
      }
    });
  }
  generarReportePDF(){
    const eventoId = this.evento.id; // Obtén el ID del evento que quieres generar
    this.eventoService.generarReportePdf(eventoId).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, `Reporte_${eventoId}.pdf`);
      },
      error: (error) => {
        console.error('Error al generar el reporte PDF:', error);
        this.showNotification('Error al generar el reporte PDF:'+ error);

      }
    });
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
