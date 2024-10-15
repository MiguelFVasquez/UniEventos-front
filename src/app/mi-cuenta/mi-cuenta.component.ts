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
  nombre = 'Admin';
  correo = 'admin@correo.com';
  password = '';
  constructor(private authService: AuthService,private router: Router) {}
  
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      
      // Aquí puedes implementar la lógica para guardar los cambios
      console.log('Datos guardados:', { nombre: this.nombre, correo: this.correo, password: this.password });
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
      // Si presiona "No", no se hace nada
      console.log('Cancelado por el usuario');
    }
  }
  
}
