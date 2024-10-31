import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroComponent } from '../registro/registro.component';
import { InitialHeaderComponent } from '../initial-header/initial-header.component';
import { AuthService } from '../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePassword } from '../models/change-password';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [InitialHeaderComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  email: any;
  codigo:string='';
  password: string = '';
  confirmPassword: string ='';
  passwordVisible: boolean = false;
  constructor(
            private dialogRef: MatDialogRef<ChangePasswordComponent>,
            private authService: AuthService,
            private snackBar: MatSnackBar) {}
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  
  onSubmit(){
    this.email= this.authService.getEmailFromToken();
    const changePassword: ChangePassword={
      codigoVerificacion: this.codigo,
      email:this.email,
      passwordNueva:this.password
    };
    this.authService.cambiarPassword(changePassword).subscribe({
      next: (response) => {
        this.snackBar.open('Contraseña cambiada con éxito', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(); // Cierra el diálogo después de cambiar la contraseña
      },
      error: (error) => {
        console.error('Error al cambiar la contraseña:', error);
        this.snackBar.open('Error al cambiar la contraseña. Intente nuevamente.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancel() {
    this.dialogRef.close(); // Cierra el diálogo sin realizar ninguna acción
  }
}
