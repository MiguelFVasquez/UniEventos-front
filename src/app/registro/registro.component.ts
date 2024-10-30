import { Component } from '@angular/core';
import { LoginComponent } from '../log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { Router, RouterLink } from '@angular/router';
import { CrearCuentaRegistroDTO } from '../models/CrearCuentaRegistroDTO';
import { AuthService } from '../servicios/auth.service';
import { MessageDTO } from '../models/message.dto';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [LoginComponent,InitialHeaderComponent,FormsModule,RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  cuentaDTO: CrearCuentaRegistroDTO = {
    idUsuario: '',
    nombre:'',
    telefono:'',
    direccion:'',
    correo:'',
    password: '',
  };
  verifyPassword:string='';
  confirmEmail: string = '';
  constructor(private authService: AuthService, private router: Router,  private snackBar: MatSnackBar) {}
  
  onSubmit() {
    if (this.cuentaDTO.password !== this.verifyPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.authService.crearCuenta(this.cuentaDTO).subscribe({
      next: (response) => {
        this.snackBar.open('Cuenta creada con éxito', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
        this.router.navigate(['/activar-cuenta']);
      },
      error: (error) => {
        console.error('Error al crear la cuenta:', error);
        this.snackBar.open('Error al crear la cuenta. Intente de nuevo.', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }
}
