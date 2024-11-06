import { CommonModule } from '@angular/common';
import { Component,Input} from '@angular/core';
import { ItemEventoDTO } from '../models/item-evento-dto';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: ItemEventoDTO; // Recibimos el evento como una entrada
  
  constructor() { }

  ngOnInit(): void { }
}
