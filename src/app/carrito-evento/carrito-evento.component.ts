import { Component, Input } from '@angular/core';
import { ItemEventoDTO } from '../models/item-evento-dto';
import { ItemCarritoDTO } from '../models/item-carritoDTO';
import { CarritoDTO } from '../models/carritoDTO';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-carrito-evento',
  standalone: true,
  imports: [],
  templateUrl: './carrito-evento.component.html',
  styleUrl: './carrito-evento.component.css'
})
export class CarritoEventoComponent {

  @Input() itemCarrito!: ItemCarritoDTO;

  idEvento: string="";
  idCarrito: string="";

  constructor(private carritoService : CarritoService){

  }

  eliminarEvento(){
    const carritoDTO: CarritoDTO = {
      idCarrito:this.idCarrito,
      idEvento: this.idEvento,
      nuevaCantidad: this.itemCarrito.nuevaCantidad,
      nLocalidad:this.itemCarrito.nLocalidad
    };

    this.carritoService.eliminarElemento(carritoDTO).subscribe({
      next: (data) => {
        data.respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
