import { Component } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-evento-board',
  standalone: true,
  imports: [EventCardComponent,RouterModule],
  templateUrl: './evento-board.component.html',
  styleUrl: './evento-board.component.css'
})
export class EventoBoardComponent {

  agregarEvento(){

  }
}
