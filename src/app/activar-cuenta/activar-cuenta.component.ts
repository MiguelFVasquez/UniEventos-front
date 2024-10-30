import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { AuthService } from '../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { ValidarCodigoDTO } from '../models/VerificarCodigoDTO';
@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [InitialHeaderComponent,FormsModule,RouterModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent {
  codigo: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    const validarCodigoDTO: ValidarCodigoDTO = { email: this.email, codigo: this.codigo };

    this.authService.validarCodigo(validarCodigoDTO).subscribe({
      next: (response) => {
        alert(response.message); // Muestra el mensaje de éxito
        this.router.navigate(['/log-in']); // Redirige al login tras activar la cuenta
      },
      error: (error) => {
        alert(error.error.message); // Muestra el mensaje de error
      }
    });
  }
}
