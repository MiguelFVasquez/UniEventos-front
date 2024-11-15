import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../servicios/token.service';
import { SharedService } from '../servicios/shared-service.service';

@Component({
  selector: 'app-header-inicio-principal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-inicio-principal.component.html',
  styleUrl: './header-inicio-principal.component.css'
})
export class HeaderInicioPrincipalComponent {
  isLogged = false;
  email: string = "";

  constructor(private sharedService: SharedService, private tokenService: TokenService,private router: Router) {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.sharedService.getCorreo();
    }
  }
  public logout() {
    this.tokenService.logout();
    this.router.navigate(['/inicio-principal']);
  }
}
