import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { AuthService } from '../servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MiCuentaService } from '../servicios/mi-cuenta.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule, RegistroComponent,InitialHeaderComponent], 
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private authService: AuthService,  private snackBar: MatSnackBar,private router: Router,private miCuentaService: MiCuentaService) {}

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
   // Método para mostrar notificaciones personalizadas
   showNotification(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'] // Clase CSS personalizada
    });
  }

  // Método que se llama cuando se envía el formulario
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (loginResponse) => {
        const token = loginResponse?.respuesta?.token;
        if (token) {
          this.authService.saveToken(token);

          const email = this.email;
          if (email) {
            this.authService.getUserInfo(email).subscribe({
              next: (userInfo) => {
                // Verifica el rol usando el email
                this.authService.verificarRol(email).subscribe({
                  next: (rolResponse) => {
                    const rol = rolResponse.respuesta;
                    if (rol) {
                      this.authService.redirectToDashboard(rol);
                    } else {
                      console.error('Rol no encontrado');
                    }
                  },
                  error: (error) => {
                    console.error('Error al verificar rol', error);
                  }
                });
              },
              error: (error) => {
                console.error('Error al obtener la información del usuario', error);
              }
            });
          } else {
            console.error('No se pudo obtener el email del token.');
          }
        } else {
          console.error('Token no encontrado en la respuesta');
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
      }
    });
  }
  
  
}