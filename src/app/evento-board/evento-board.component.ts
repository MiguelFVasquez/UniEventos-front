import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evento-board',
  standalone: true,
  imports: [EventCardComponent,RouterModule],
  templateUrl: './evento-board.component.html',
  styleUrl: './evento-board.component.css'
})
export class EventoBoardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  agregarEvento(){

  }
  filtrarEventos(){}
}
