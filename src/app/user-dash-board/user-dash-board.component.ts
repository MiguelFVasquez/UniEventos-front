import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '../servicios/shared-service.service';

@Component({
  selector: 'app-user-dash-board',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-dash-board.component.html',
  styleUrl: './user-dash-board.component.css'
})
export class UserDashBoardComponent {

}
