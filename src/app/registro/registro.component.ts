import { Component } from '@angular/core';
import { LoginComponent } from '../log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [LoginComponent,InitialHeaderComponent,FormsModule,RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor() {}

  onSubmit() {
    // Aquí puedes manejar el evento de envío del formulario
    console.log('Formulario de registro enviado');
  }
}
