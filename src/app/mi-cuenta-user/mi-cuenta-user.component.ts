import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './mi-cuenta-user.component.html',
  styleUrl: './mi-cuenta-user.component.css'
})
export class MiCuentaUserComponent {
  isEditable = false;
  user = {
    nombre: 'Juan',
    apellido: 'Florez',
    direccion: 'Cra 24A #101',
    telefono: '1234567890',
    correo: 'juan.florez@example.com',
    password: '********',
    fechaNacimiento: '1990-01-01'
  };
  constructor(private router: Router) {}

  toggleEditable() {
    this.isEditable = !this.isEditable;
  }

  changePassword() {
    // Lógica para cambiar la contraseña
    alert('Redirigiendo a cambiar contraseña');
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    const confirmacion = window.confirm('¿Seguro que desea cerrar sesión?');

    if (confirmacion) {
      // Si presiona "Sí", redirige a la ruta de inicio de sesión
      this.router.navigate(['/log-in']);
    } else {
      // Si presiona "No", no se hace nada
      console.log('Cancelado por el usuario');
    }
  }

  eliminarCuenta() {
    // Lógica para eliminar la cuenta
  }
}
