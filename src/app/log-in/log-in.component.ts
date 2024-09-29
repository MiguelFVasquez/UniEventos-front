import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,RegistroComponent], 
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Aquí puedes agregar la lógica para autenticar al usuario
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
