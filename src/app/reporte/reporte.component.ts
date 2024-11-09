import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventoService } from '../servicios/evento-service.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  constructor( private eventoService: EventoService,){}
  //TO DO generar el DTO de 'reporteEventoDTO' para evitar el uso de any
  generarReporteWeb() {
    this.eventoService.generarReporteWebInactivos().subscribe({
      next: (reportes) => {
        this.abrirReporteWebInactivos(reportes);
      },
      error: (error) => {
        console.error("Error al generar el reporte web de eventos inactivos:", error);
      }
    });
  }

  generarReportePdf() {
    this.eventoService.generarReportePdfInactivos().subscribe({
      next: (pdfBlob) => {
        // Guardar el archivo PDF utilizando FileSaver
        saveAs(pdfBlob, 'reporte_inactivos.pdf');
      },
      error: (error) => {
        console.error("Error al generar el reporte de eventos inactivos:", error);
      }
    });
  }

  private abrirReporteWebInactivos(reportes: any[]): void {
    const reporteHtml = `
      <html>
      <head>
        <title>Reporte de Eventos</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          h1, h2 { color: #007bff; text-align: center; }
          .evento { margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
          .evento h2 { margin: 0 0 10px; font-size: 20px; color: #333; }
          .detalle { margin-left: 20px; }
          .localidad { font-weight: bold; color: #555; margin-top: 5px; }
          .atributo { font-size: 14px; color: #333; margin-top: 3px; }
        </style>
      </head>
      <body>
        <h1>Reporte de Eventos Inactivos</h1>
        ${reportes.map((evento: any) => `
          <div class="evento">
            <h2>${evento.nombre}</h2>
            <div class="detalle">Fecha: ${evento.fecha}</div>
            <div class="detalle">Ciudad: ${evento.ciudad}</div>
            <div class="detalle">Descripción: ${evento.descripcion}</div>
            <h3>Localidades</h3>
            ${evento.localidades.map((localidad: any) => `
              <div class="localidad">${localidad.nombre}</div>
              <div class="atributo">Precio: ${localidad.precio}</div>
              <div class="atributo">Entradas Vendidas: ${localidad.entradasVendidas}</div>
              <div class="atributo">Capacidad Máxima: ${localidad.capacidadMaxima}</div>
            `).join('')}
          </div>
        `).join('')}
      </body>
      </html>
    `;

    const ventana = window.open('', '_blank');
    ventana?.document.write(reporteHtml);
    ventana?.document.close();
  }
}
