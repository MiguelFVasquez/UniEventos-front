import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,RegistroComponent, InitialHeaderComponent], 
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router) {}

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Método que se llama cuando se envía el formulario
  onSubmit() {
    const validEmail = 'admin@gmail.com';
    const validPassword = 'admin';

    if (this.email === validEmail && this.password === validPassword) {
      this.router.navigate(['/admin/dashboard']); // Redirige al dashboard
    } else {
      alert('Correo electrónico o contraseña incorrectos.');
    }
  }
}