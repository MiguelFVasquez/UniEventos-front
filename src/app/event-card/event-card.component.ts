import { CommonModule } from '@angular/common';
import { Component,Input, Output,EventEmitter} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Evento } from '../models/evento';
import { ItemEventoDTO } from '../models/item-evento-dto';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: ItemEventoDTO; // Recibimos el evento como una entrada
  @Output() eventClick = new EventEmitter<string>();
  
  constructor(private router:Router) { }
  onEventClick() {
    this.eventClick.emit(this.event.id); // Emite el id cuando el evento es clickeado
    console.log("Evento", this.event);
  }
}
