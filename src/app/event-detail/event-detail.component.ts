import { Component } from '@angular/core';
import { HeaderInicioPrincipalComponent } from '../header-inicio-principal/header-inicio-principal.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [HeaderInicioPrincipalComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  
}
