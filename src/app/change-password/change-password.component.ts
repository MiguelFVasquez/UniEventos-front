import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { AuthService } from '../servicios/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [InitialHeaderComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(){}
}
