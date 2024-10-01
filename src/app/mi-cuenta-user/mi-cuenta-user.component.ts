import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-cuenta-user',
  standalone: true,
  imports: [FormsModule],
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

  toggleEditable() {
    this.isEditable = !this.isEditable;
  }

  changePassword() {
    // Lógica para cambiar la contraseña
    alert('Redirigiendo a cambiar contraseña');
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    alert('Sesión cerrada');
  }

  eliminarCuenta() {
    // Lógica para eliminar la cuenta
    alert('Cuenta eliminada');
  }
}
