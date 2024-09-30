import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cupon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cupon-card.component.html',
  styleUrl: './cupon-card.component.css'
})
export class CuponCardComponent {
    @Input() cupon!: {
    nombre: string;
    descuento: number;
    fechaVencimiento: Date;
    codigo: string;
    estado: string;
    tipo: string;
  };

  editarCupon(cupon: any) {
    // Lógica para editar el cupón
    console.log('Editar cupón:', cupon);
  }
  
  eliminarCupon(cupon: any) {
    // Lógica para eliminar el cupón
    console.log('Eliminar cupón:', cupon);
  }

}
