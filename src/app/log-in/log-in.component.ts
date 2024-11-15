import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { AuthService } from '../servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MiCuentaService } from '../servicios/mi-cuenta.service';
import { SharedService } from '../servicios/shared-service.service';
import { TokenService } from '../servicios/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,InitialHeaderComponent], 
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  idCuenta: string='';
  idCarrito: string= '';
  constructor(private authService: AuthService,  
              private snackBar: MatSnackBar,
              private router: Router,
              private sharedService: SharedService,
              private tokenService: TokenService
  ) {}

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
   // Método para mostrar notificaciones personalizadas
public showNotification(message: string, action: string = 'Cerrar') {
  Swal.fire({
    title: message,
    confirmButtonText: action,
    icon: 'info',
    position: 'top',
    timer: 3000, // Duración en milisegundos
    timerProgressBar: true,
    showCloseButton: true,
    toast: true,
    customClass: {
      popup: 'custom-swal-popup' // Clase CSS personalizada
    }
  });
}

  // Método que se llama cuando se envía el formulario
onSubmit() {
  this.authService.login(this.email, this.password).subscribe({
    next: (loginResponse) => {
      const token = loginResponse?.respuesta?.token;
      if (token) {
        this.tokenService.login(token);
        this.sharedService.setPassword(this.password);
      
        // Almacena temporalmente el email para obtener información adicional
        const email = this.email;
          
        if (email) {
          // Obtiene información adicional del usuario
          this.sharedService.setCorreo(email);
          localStorage.setItem('email', email)
          this.authService.getUserInfo(email).subscribe({
            next: (userInfo) => {
              this.idCuenta = userInfo?.idCuenta;
              this.idCarrito = userInfo?.idCarrito;

              // Almacena los IDs en SharedService
              this.sharedService.setUserId(this.idCuenta);
              this.sharedService.setCarritoId(this.idCarrito);

              localStorage.setItem('idUser', this.idCuenta);
              localStorage.setItem('idCarrito', this.idCarrito);

              // Obtiene el rol directamente desde el token
              const rol = this.tokenService.getRol();
              if (rol) {
                this.authService.redirectToDashboard(rol);
                this.showNotification('Inicio de sesión exitoso', 'Cerrar');
              } else {
                this.showNotification('Rol no encontrado en el token', 'Cerrar');
                console.error('Rol no encontrado en el token');
              }
            },
            error: (error) => {
              this.showNotification('Error al obtener la información del usuario', 'Cerrar');
              console.error('Error al obtener la información del usuario', error);
            }
          });
        } else {
          this.showNotification('No se pudo obtener el email del token.', 'Cerrar');
          console.error('No se pudo obtener el email del token.');
        }
      } else {
        this.showNotification('Token no encontrado en la respuesta', 'Cerrar');
        console.error('Token no encontrado en la respuesta');
      }
    },
    error: (error) => {
      this.showNotification('Error al iniciar sesión', 'Cerrar');
      console.error('Error al iniciar sesión', error);
    }
  });
}
  
  
  
  
  
}