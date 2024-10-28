import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../servicios/cupon.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-cupon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-cupon.component.html',
  styleUrl: './editar-cupon.component.css'
})
export class EditarCuponComponent {
  @Input() cupon: any;
  @Output() cerrar = new EventEmitter<void>();
  constructor(private cuponService: CuponService, private dialogRef: MatDialogRef<EditarCuponComponent>) {}

  actualizarCupon(): void {
    // Lógica para actualizar el cupón
    this.cerrar.emit();
  }

  cancelarEdicion(): void {
    this.dialogRef.close();
  }
}
