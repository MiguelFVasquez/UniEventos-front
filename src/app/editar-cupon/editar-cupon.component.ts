import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../servicios/cupon.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EditarCuponDTO } from '../models/editar-cupon-dto';

@Component({
  selector: 'app-editar-cupon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-cupon.component.html',
  styleUrl: './editar-cupon.component.css'
})
export class EditarCuponComponent {
  cuponDTO!: EditarCuponDTO; // Asegúrate de inicializar esto
  @Output() cerrar = new EventEmitter<void>();

  constructor(
      private cuponService: CuponService,
      private snackBar: MatSnackBar,
      private dialogRef: MatDialogRef<EditarCuponComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { cupon: { id: string; nombre: string; descuento: number; fechaVencimiento: string; tipo: string } } // Recibe el objeto cupon
  ) {
      // Inicializa cuponDTO con los valores del cupon recibido
      if (data && data.cupon) {
          this.cuponDTO = {
              nombre: data.cupon.nombre,
              descuento: data.cupon.descuento,
              fechaVencimiento: data.cupon.fechaVencimiento,
              tipo: data.cupon.tipo
          };
      }
  }

  actualizarCupon(): void {
      // Verifica si cupon tiene un ID válido
      if (!this.data.cupon || !this.data.cupon.id) {
          console.error("El ID del cupón no está definido.");
          return;
      }
       // Formatear la fecha a LocalDateTime (aquí solo se usa el inicio del día)
      const date = new Date(this.cuponDTO.fechaVencimiento);
      const formattedDate = date.toISOString()

    // Actualiza el objeto cuponDTO
      this.cuponDTO.fechaVencimiento = formattedDate;
      this.cuponService.actualizarCupon(this.data.cupon.id, this.cuponDTO).subscribe({
          next: (response) => {
              this.snackBar.open('¡Cupón actualizado correctamente!', 'Cerrar', {
                  duration: 3000,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'center'
              });
              this.cerrar.emit();
              this.dialogRef.close();
          },
          error: (err) => {
              console.error('Error al actualizar el cupón:', err);
              this.snackBar.open('Error al actualizar el cupón. Inténtalo de nuevo.', 'Cerrar', {
                  duration: 3000,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'center'
              });
          }
      });
  }

  cancelarEdicion(): void {
      this.dialogRef.close();
  }
}

