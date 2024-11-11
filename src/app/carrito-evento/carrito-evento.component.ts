import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carrito-evento',
  standalone: true,
  imports: [],
  templateUrl: './carrito-evento.component.html',
  styleUrl: './carrito-evento.component.css'
})
export class CarritoEventoComponent {

  @Input() CarritoDTO: any;

}
