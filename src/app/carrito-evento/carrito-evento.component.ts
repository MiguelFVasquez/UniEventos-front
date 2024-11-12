import { Component, Input } from '@angular/core';
import { ItemEventoDTO } from '../models/item-evento-dto';
import { ItemCarritoDTO } from '../models/item-carritoDTO';

@Component({
  selector: 'app-carrito-evento',
  standalone: true,
  imports: [],
  templateUrl: './carrito-evento.component.html',
  styleUrl: './carrito-evento.component.css'
})
export class CarritoEventoComponent {

  @Input() itemCarrito!: ItemCarritoDTO;

}
