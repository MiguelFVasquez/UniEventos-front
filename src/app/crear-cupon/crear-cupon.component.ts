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
    // Verificar que los campos obligatorios no estén vacíos o sean inválidos
    if (!this.nombre || this.nombre.trim() === '') {
      alert('Error: El nombre es obligatorio');
      return;
    }
  
    if (!this.codigo || this.codigo.trim() === '') {
      alert('Error: El código es obligatorio');
      return;
    }
  
    if (!this.tipo || this.tipo.trim() === '') {
      alert('Error: El tipo de cupón es obligatorio');
      return;
    }
  
    if (this.descuento <= 0) {
      alert('Error: El descuento debe ser mayor a 0');
      return;
    }
  
    if (!this.fechaVencimiento) {
      alert('Error: La fecha de vencimiento es obligatoria');
      return;
    }
  
    // Convertir fechaVencimiento a LocalDateTime en el formato esperado (ISO 8601)
    const date = new Date(this.fechaVencimiento);
    if (isNaN(date.getTime())) { // Verifica que la fecha sea válida
      alert('Error: Fecha de vencimiento no es válida');
      return;
    }
  
    const formattedFechaVencimiento = date.toISOString(); // Convertir a ISO 8601
  
    // Crear el DTO con los datos validados
    const cuponDTO: CrearCuponDTO = {
      nombre: this.nombre.trim(),
      descuento: this.descuento,
      fechaVencimiento: formattedFechaVencimiento,
      codigo: this.codigo.trim(),
      tipo: this.tipo.trim()  // Asegurarse de que no sea nulo
    };
  
    // Llamar al servicio para guardar el cupón
    this.cuponService.guardarCupon(cuponDTO).subscribe({
      next: (response) => {
        console.log('Cupón guardado exitosamente', response);
        alert('Cupón guardado exitosamente'); // Alerta de éxito
        this.dialogRef.close(); // Cerrar el diálogo al guardar
      },
      error: (error) => {
        console.error('Error al guardar el cupón', error);
        alert('Error al guardar el cupón: ' + error.message); // Alerta de error
      }
    });
  }
   
  
  

  cerrar() {
    this.dialogRef.close();
  }
  
}
