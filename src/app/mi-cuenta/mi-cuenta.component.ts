import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrl: './mi-cuenta.component.css'
})
export class MiCuentaComponent {
  editMode = false;
  nombre = 'Miguel';
  cedula = '1234567890';
  telefono = '987654321';
  direccion = 'Calle 24A#101';
  correo = 'admin@correo.com';
  password = "";
  rol = 'ADMINISTRADOR';
  constructor(private authService: AuthService,private router: Router) {}
  toggleEditMode() {
    this.editMode = !this.editMode;
  
    if (this.editMode) {
      // Muestra una alerta indicando que ahora puede editar la información
      alert('Ahora puede editar su información.');
    } else {
      // Implementa la lógica para guardar los cambios y mostrar la alerta de éxito
      console.log('Datos guardados:', {
        nombre: this.nombre,
        cedula: this.cedula,
        telefono: this.telefono,
        direccion: this.direccion,
        correo: this.correo,
        password: this.password // Este campo no se puede editar
      });
  
      // Muestra una alerta indicando que los cambios se han guardado con éxito
      alert('Los cambios han sido guardados con éxito.');
    }
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
    // Lógica para eliminar la cuenta
  }
}
