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

  constructor(private router:Router) { }

  ngOnInit(): void { }
}
