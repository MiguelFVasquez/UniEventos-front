import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CuponCardComponent } from '../cupon-card/cupon-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearCuponComponent } from '../crear-cupon/crear-cupon.component';
import { CuponService } from '../servicios/cupon.service';
import { Page } from '../models/Page';
@Component({
  selector: 'app-cupon-board',
  standalone: true,
  imports: [CommonModule,CuponCardComponent,RouterModule],
  templateUrl: './cupon-board.component.html',
  styleUrl: './cupon-board.component.css'
})
export class CuponBoardComponent {
  
  cuponesDisponibles: any[] = [];
  cuponesNoDisponibles: any[] = [];
  size: number = 4; // Tamaño de página para coincidir con el backend
  paginaActualDisponibles: number = 0;
  paginaActualNoDisponibles: number = 0;
  totalPaginasDisponibles: number = 0;
  totalPaginasNoDisponibles: number = 0;
  constructor(private dialog: MatDialog, private cuponService: CuponService) {}

  ngOnInit() {
    this.cargarCuponesDisponibles();
    this.cargarCuponesNoDisponibles();
  }
  //Se cargan los cupones dispobles
  cargarCuponesDisponibles() {
    this.cuponService.obtenerCuponesDisponibles(this.paginaActualDisponibles, this.size).subscribe(data => {
      this.cuponesDisponibles = data.content;
      this.totalPaginasDisponibles = data.totalPages;
    });
  }
  //Se cargan los cupones no disponibles
  cargarCuponesNoDisponibles() {
    this.cuponService.obtenerCuponesNoDisponibles(this.paginaActualNoDisponibles, this.size).subscribe(data => {
      this.cuponesNoDisponibles = data.content;
      this.totalPaginasNoDisponibles = data.totalPages;
    });
  }

  agregarCupon() {
    const dialogRef = this.dialog.open(CrearCuponComponent, {
      width: '550px', // Ajusta el ancho del diálogo
      disableClose: true,
      panelClass: 'custom-dialog', // Opcional, para evitar cerrar al hacer clic fuera
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica después de cerrar el diálogo, si es necesario
    });
  }

  // Método para manejar la eliminación de cupones
  onCuponEliminado(id: string) {
    // Eliminar de la lista de cupones disponibles
    this.cuponesDisponibles = this.cuponesDisponibles.filter(cupon => cupon.id !== id);
    // También puedes eliminarlo de la lista de no disponibles si es necesario
    this.cuponesNoDisponibles = this.cuponesNoDisponibles.filter(cupon => cupon.id !== id);
  }

  // Métodos para manejar la paginación
  cambiarPaginaDisponibles(incremento: number) {
    const nuevaPagina = this.paginaActualDisponibles + incremento;
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPaginasDisponibles) {
      this.paginaActualDisponibles = nuevaPagina;
      this.cargarCuponesDisponibles();
    }
  }

  cambiarPaginaNoDisponibles(incremento: number) {
    const nuevaPagina = this.paginaActualNoDisponibles + incremento;
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPaginasNoDisponibles) {
      this.paginaActualNoDisponibles = nuevaPagina;
      this.cargarCuponesNoDisponibles();
    }
  }
}
