import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { SharedService } from '../servicios/shared-service.service';
import { MiCuentaService } from '../servicios/mi-cuenta.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoAdicionalDTO } from '../models/InfoAdicionalDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MiCuentaUserServiceService } from '../servicios/mi-cuenta-user-service.service';
@Component({
  selector: 'app-mi-cuenta-user',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './mi-cuenta-user.component.html',
  styleUrl: './mi-cuenta-user.component.css'
})
export class MiCuentaUserComponent {
  editMode: boolean = false;
  user = {
    nombre: '',
    cedula: '',
    telefono: '',
    direccion: '',
    correo: '',
    rol: '',
    password: '',
    fechaNacimiento: ''
  };
  passwordVisible: boolean = false;
  constructor(private authService: AuthService,
              private router: Router,
              private sharedService: SharedService,
              private miCuentaService:MiCuentaUserServiceService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar ) {}


  ngOnInit() {
    const email = this.authService.getEmailFromToken();
    if (email) {
      this.cargarDatosUsuario(email);
      // Obtén la contraseña desde el servicio compartido
      this.user.password = this.sharedService.getPassword();
      // Limpia la contraseña del servicio después de obtenerla
      //this.sharedService.clearPassword();
    }else{
      console.log("Error al obtener el email");
    }
  }

  //Metodo con el que se obtiene la información de la cuenta
  cargarDatosUsuario(email: string) {
    this.authService.getUserInfo(email).subscribe({
      next: (info) => {
        this.user.cedula=info.cedula;
        this.user.nombre = info.nombre;
        this.user.telefono = info.telefono;
        this.user.direccion = info.direccion;
        this.user.correo = info.email;
        
        // Obtén el rol desde authService
        this.authService.verificarRol(email).subscribe({
          next: (rolResponse) => {
            this.user.rol = rolResponse.respuesta; // Ajusta según la estructura de la respuesta
          },
          error: (error) => {
            console.error('Error al verificar rol', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    });
  }
    //Metodo para visualizar la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  //Metodo con el que se habilita la edición de los datos de la cuenta
  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      alert('Ahora puede editar su información.');
    } else {
      this.guardarCambios();
    }
  }
  //Metodo que se utiliza cuando ya se han actualizaado los datos y los guarda
  guardarCambios() {
    const infoAdicionalDTO: InfoAdicionalDTO = {
      nombre: this.user.nombre,
      cedula: this.user.cedula,
      telefono: this.user.telefono,
      direccion: this.user.direccion,
      email: this.user.correo
    };

    this.miCuentaService.editarCuentaUser(infoAdicionalDTO).subscribe({
      next: (response) => {
        this.showNotification(response.message);
      },
      error: (error) => {
        console.error('Error al guardar los cambios:', error);
        this.showNotification('Error al guardar los cambios');
      }
    });
  }
  //Metodo con el que habilitamos el cambio del password
  changePassword() {
    if (this.user.correo) {
      console.log('email: ', this.user.correo)
      // Llama al servicio para enviar el código al email del usuario
      this.authService.enviarCodigo(this.user.correo).subscribe({
        next: (response) => {
          this.showNotification(response.message); // Muestra el mensaje de éxito
          // Abre el componente ChangePasswordComponent como un diálogo después de enviar el código
          this.dialog.open(ChangePasswordComponent, {
            width: '500px',
            disableClose: true,
            panelClass: 'custom-dialog',
          });
        },
        error: (error) => {
          console.error('Error al enviar el código:', error);
          this.showNotification('Error al enviar el código al correo.');
        }
      });
    } else {
      this.showNotification('Por favor, asegúrate de tener un email válido.');
    }
  }

  //Metodo con el que finalizamos nuestra sesión y se redirige al componente principal
  cerrarSesion() {
  // Redirecciona al log in
    const confirmacion = window.confirm('¿Seguro que desea cerrar sesión?');
    
    if (confirmacion) {
      // Si presiona "Sí", elimina el token del localStorage
      this.authService.saveToken(''); // Elimina el token

      // Redirige a la ruta de inicio de sesión
      this.router.navigate(['/inicio-principal']);
    } else {
      console.log('Cancelado por el usuario');
    }
  }
  //Metodo que se utiliza a la hora de eliminar la cuenta
  eliminarCuenta() {

  // Confirmar antes de eliminar
  const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmacion) {
      // Si el usuario confirma, llama al servicio para eliminar la cuenta
      this.miCuentaService.eliminarCuentaUser(this.user.correo).subscribe({
        next: (response) => {
          this.showNotification(response.message);

          // Redirigir al usuario al componente de login tras la eliminación
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al eliminar la cuenta', error);
          this.showNotification('Error al eliminar la cuenta');
        }
      });
    }
  }
  showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
