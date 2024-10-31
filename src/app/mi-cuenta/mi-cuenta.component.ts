import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { MiCuentaService } from '../servicios/mi-cuenta.service';
import { SharedService } from '../servicios/shared-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoAdicionalDTO } from '../models/InfoAdicionalDTO';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent {
  editMode = false;
  nombre = '';
  cedula = ''; // Este valor podría obtenerse de otra fuente si lo necesitas
  telefono = '';
  direccion = '';
  correo = '';
  password = '';
  rol = '';

  passwordVisible: boolean = false;
  constructor(private router: Router,
              private authService: AuthService,
              private sharedService: SharedService,
              private miCuentaService:MiCuentaService,
              private snackBar: MatSnackBar,) {}

  ngOnInit() {
    const email = this.authService.getEmailFromToken();
    if (email) {
      this.cargarDatosUsuario(email);
      // Obtén la contraseña desde el servicio compartido
      this.password = this.sharedService.getPassword();
      // Limpia la contraseña del servicio después de obtenerla
      //this.sharedService.clearPassword();
    }else{
      console.log("Error al obtener el email");
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  cargarDatosUsuario(email: string) {
    this.authService.getUserInfo(email).subscribe({
      next: (info) => {
        this.cedula=info.cedula;
        this.nombre = info.nombre;
        this.telefono = info.telefono;
        this.direccion = info.direccion;
        this.correo = info.email;
        
        // Obtén el rol desde authService
        this.authService.verificarRol(email).subscribe({
          next: (rolResponse) => {
            this.rol = rolResponse.respuesta; // Ajusta según la estructura de la respuesta
          },
          error: (error) => {
            console.error('Error al verificar rol', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      alert('Ahora puede editar su información.');
    } else {
      this.guardarCambios();
    }
  }
  guardarCambios() {
    const infoAdicionalDTO: InfoAdicionalDTO = {
      nombre: this.nombre,
      cedula: this.cedula,
      telefono: this.telefono,
      direccion: this.direccion,
      email: this.correo
    };

    this.miCuentaService.editarCuenta(infoAdicionalDTO).subscribe({
      next: (response) => {
        this.showNotification(response.message);
        alert('Los cambios han sido guardados con éxito.');
      },
      error: (error) => {
        console.error('Error al guardar los cambios:', error);
        this.showNotification('Error al guardar los cambios');
      }
    });
  }
  logout() {
    // Redirecciona al log in
    const confirmacion = window.confirm('¿Seguro que desea cerrar sesión?');
  
    if (confirmacion) {
      // Si presiona "Sí", elimina el token del localStorage
      this.authService.saveToken(''); // Elimina el token
  
      // Redirige a la ruta de inicio de sesión
      this.router.navigate(['/log-in']);
    } else {
      console.log('Cancelado por el usuario');
    }
  }
  changePassword() {
    // Lógica para cambiar la contraseña
    console.log('Cambiar contraseña');
    // Aquí puedes redirigir o abrir un modal para cambiar la contraseña
  }
  eliminarCuenta() {
    // Confirmar antes de eliminar
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");

    if (confirmacion) {
      // Si el usuario confirma, llama al servicio para eliminar la cuenta
      this.miCuentaService.eliminarCuenta(this.correo).subscribe({
        next: (response) => {
          this.showNotification(response.message);

          // Redirigir al usuario al componente de login tras la eliminación
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al eliminar la cuenta', error);
          this.showNotification('Error al eliminar la cuenta');
        }
      });
    }
  }
  showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
