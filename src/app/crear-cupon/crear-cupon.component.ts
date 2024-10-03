import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
//Para el back
import { CuponService } from '../servicios/cupon.service';
import { CrearCuponDTO } from '../models/crear-cupon.dto';

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports:[CommonModule,FormsModule,MatFormFieldModule, MatInputModule,MatSelectModule],
  templateUrl: './crear-cupon.component.html',
  styleUrls: ['./crear-cupon.component.css']
})
export class CrearCuponComponent {
  tiposCupon: string[] = ['UNICO', 'MULTIPLE'];
  nombre: string = '';
  descuento: number = 0;
  fechaVencimiento: string = ''; // Usa string para capturar el valor del input
  codigo: string = '';
  tipo: string = '';

  
  constructor(private cuponService: CuponService, private dialogRef: MatDialogRef<CrearCuponComponent>) {}

  guardarCupon() {

    console.log('Fecha de vencimiento:', this.fechaVencimiento); // Imprimir el valor
    // Verificar que fechaVencimiento no sea vacío y sea un valor válido
    if (!this.fechaVencimiento) {
      alert('Fecha vencimiento no es válida')
      console.error('Fecha vencimiento no es válida');
      return;
    }

    // Convertir fechaVencimiento a LocalDateTime en el formato esperado
    const date = new Date(this.fechaVencimiento);
    if (isNaN(date.getTime())) { // Verifica que la fecha sea válida
      alert('Error: Fecha de vencimiento no es válida');
      console.error('Error: Fecha de vencimiento no es válida');
      return;
    }
    
    const formattedFechaVencimiento = date.toISOString(); // Convertir a ISO 8601

    const cuponDTO: CrearCuponDTO = {
      nombre: this.nombre,
      descuento: this.descuento,
      fechaVencimiento: formattedFechaVencimiento, // Usar el formato ISO
      codigo: this.codigo,
      tipo: this.tipo
    };

    this.cuponService.guardarCupon(cuponDTO).subscribe({
      next: (response) => {
        console.log('Cupón guardado exitosamente', response);
        this.dialogRef.close(); // Cerrar el diálogo al guardar
      },
      error: (error) => {
        console.error('Error al guardar el cupón', error);
      }
    });

}

  cerrar() {
    this.dialogRef.close();
  }
  
}
