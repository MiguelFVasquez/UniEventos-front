import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  generarReporteWeb() {
    console.log('Generar reporte web');
    // Lógica para generar reporte web
  }

  generarReportePdf() {
    console.log('Generar reporte PDF');
    // Lógica para generar reporte PDF
  }
}
