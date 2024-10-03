import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports:[CommonModule,FormsModule,MatFormFieldModule, MatInputModule,MatSelectModule],
  templateUrl: './crear-cupon.component.html',
  styleUrls: ['./crear-cupon.component.css']
})
export class CrearCuponComponent {
  tiposCupon: string[] = ['Único', 'Múltiple'];

  constructor(public dialogRef: MatDialogRef<CrearCuponComponent>) {}
  guardarCupon() {
    // Aquí manejas la lógica para enviar el formulario al backend
    // Puedes tomar los valores del formulario y enviarlos a través de un servicio HTTP
    console.log('Cupón guardado');
  }

  cerrar() {
    this.dialogRef.close();
  }
  
}
