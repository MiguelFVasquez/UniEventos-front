import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { AuthService } from '../servicios/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Método que se llama cuando se envía el formulario
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (loginResponse) => {
        const token = loginResponse?.respuesta?.token;  // Accede al token correctamente
  
        if (token) {
          this.authService.saveToken(token);
  
          // Ahora verifica el rol usando el email
          this.authService.verificarRol(this.email).subscribe({
            next: (rolResponse) => {
              const rol = rolResponse.respuesta; // Ajusta según tu respuesta
  
              if (rol) {
                this.authService.redirectToDashboard(rol);
              } else {
                console.error('Rol no encontrado');
                alert('No se pudo obtener el rol. Verifica los datos e inténtalo de nuevo.');
              }
            },
            error: (error) => {
              console.error('Error al verificar rol', error);
              alert('No se pudo verificar el rol. Inténtalo de nuevo más tarde.');
            }
          });
        } else {
          console.error('Token no encontrado en la respuesta');
          alert('No se pudo obtener el token. Verifica los datos e inténtalo de nuevo.');
        }
      },
      error: (error) => {
        alert('Correo electrónico o contraseña incorrectos.');
        console.log('Correo: ', this.email);
        console.error('Error al iniciar sesión', error);
      }
    });
  }  
  
}