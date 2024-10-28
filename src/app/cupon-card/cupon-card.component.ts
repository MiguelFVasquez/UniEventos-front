import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CuponService } from '../servicios/cupon.service';
import { MessageDTO } from '../models/message.dto';

@Component({
  selector: 'app-cupon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cupon-card.component.html',
  styleUrl: './cupon-card.component.css'
})
export class CuponCardComponent {
    @Input() cupon!: {
    id: string; 
    nombre: string;
    descuento: number;
    fechaVencimiento: Date;
    codigo: string;
    estado: string;
    tipo: string;
  };
  //para el alert
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';


  @Output() cuponEliminado = new EventEmitter<string>(); // Emitir evento cuando se elimine un cupón
  constructor(private cuponService: CuponService) {}
  editarCupon(cupon: any) {
    // Lógica para editar el cupón
    console.log('Editar cupón:', cupon);
  }
  
  eliminarCupon() {
    const confirmacion = window.confirm('¿Seguro que desea eliminar este cupón?');
    if (confirmacion) {
      this.cuponService.eliminarCupon(this.cupon.id).subscribe({
        next: (response: MessageDTO) => {
          this.alertMessage = 'Cupón eliminado con éxito.'; // Mensaje de éxito
          this.alertType = 'success'; // Tipo de alerta
          console.log(response.message); // Mensaje de éxito
          this.cuponEliminado.emit(this.cupon.id); // Emitir evento para indicar que el cupón ha sido eliminado
        },
        error: (error) => {
          this.alertMessage = 'Error al eliminar el cupón. Inténtalo de nuevo.'; // Mensaje de error
          this.alertType = 'error'; // Tipo de alerta
          console.error('Error al eliminar el cupón:', error);
        }
      });
    } else {
      console.log('Cancelado por el usuario');
    }
    
  }

}
