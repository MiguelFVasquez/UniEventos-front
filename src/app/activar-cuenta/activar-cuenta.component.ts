import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { AuthService } from '../servicios/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [InitialHeaderComponent,FormsModule,RouterModule],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent {
  codigo: string='';
  email: string='';
  onSubmit(){}
}
