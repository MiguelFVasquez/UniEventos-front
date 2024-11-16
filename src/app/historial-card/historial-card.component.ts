import { Component, Input } from '@angular/core';
import { ItemOrdenDTO } from '../models/ItemOrdenDTO';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-historial-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-card.component.html',
  styleUrl: './historial-card.component.css'
})
export class HistorialCardComponent {
  @Input() item: ItemOrdenDTO | undefined;


  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
}
