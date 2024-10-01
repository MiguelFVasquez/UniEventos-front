import { Component } from '@angular/core';
import { CuponCardComponent } from '../cupon-card/cupon-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cupon-board',
  standalone: true,
  imports: [CommonModule,CuponCardComponent,RouterModule ],
  templateUrl: './cupon-board.component.html',
  styleUrl: './cupon-board.component.css'
})
export class CuponBoardComponent {
  


  cupones = [
    { nombre: 'Descuento Summer', descuento: 20, fechaVencimiento: new Date('2024-12-31'), codigo: 'DESC20', estado: 'Disponible', tipo: 'Único' },
    { nombre: 'Descuento Winter', descuento: 30, fechaVencimiento: new Date('2024-11-30'), codigo: 'DESC30', estado: 'No-Disponible', tipo: 'Múltiple' },
    { nombre: 'Descuento Spring', descuento: 30, fechaVencimiento: new Date('2024-11-30'), codigo: 'DESC30', estado: 'Disponible', tipo: 'Múltiple' },
    { nombre: 'Descuento Autumn', descuento: 30, fechaVencimiento: new Date('2024-11-30'), codigo: 'DESC30', estado: 'No-Disponible', tipo: 'Múltiple' }
  ];
    // Aquí puedes cargar los cupones desde un servicio o API
  
  agregarCupon() {
    // Lógica para agregar un nuevo cupón
  }
}
