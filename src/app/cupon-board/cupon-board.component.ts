import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CuponCardComponent } from '../cupon-card/cupon-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CrearCuponComponent } from '../crear-cupon/crear-cupon.component';
import { CuponService } from '../servicios/cupon.service';
@Component({
  selector: 'app-cupon-board',
  standalone: true,
  imports: [CommonModule,CuponCardComponent,RouterModule],
  templateUrl: './cupon-board.component.html',
  styleUrl: './cupon-board.component.css'
})
export class CuponBoardComponent {
  
  cuponesDisponibles: any[] = [];  // Lista de cupones disponibles
  cuponesNoDisponibles: any[] = [];  // Lista de cupones no disponibles


  constructor(private dialog: MatDialog, private cuponService: CuponService) {}

  ngOnInit() {
    this.cargarCupones(); // Cargar cupones al iniciar el componente
  }
    // Aquí puedes cargar los cupones desde un servicio o API
  cargarCupones() {
    this.cuponService.obtenerCupones().subscribe({
      next: (data) => {
        this.cuponesDisponibles = data.filter(cupon => cupon.estado === 'DISPONIBLE');
        this.cuponesNoDisponibles = data.filter(cupon => cupon.estado === 'NO_DISPONIBLE');
      },
      error: (err) => {
        console.error('Error al cargar los cupones', err);
      }
    });
  } 
  agregarCupon() {
    const dialogRef = this.dialog.open(CrearCuponComponent, {
      width: '550px', // Ajusta el ancho del diálogo
      disableClose: true // Opcional, para evitar cerrar al hacer clic fuera
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica después de cerrar el diálogo, si es necesario
    });
  }
  
}
