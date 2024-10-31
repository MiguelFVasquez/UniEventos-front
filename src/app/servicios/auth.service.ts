import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CrearCuentaRegistroDTO } from '../models/CrearCuentaRegistroDTO';
import { MessageDTO } from '../models/message.dto';
import { ValidarCodigoDTO } from '../models/VerificarCodigoDTO';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
  export class AuthService {
    private apiUrl = 'http://localhost:8080/api/public'; 

    constructor(private http: HttpClient, private router: Router) {}

    // Método para hacer login y obtener el token
    login(correo: string, password: string): Observable<any> {
      const loginDTO = { correo, password }; // Cuerpo de la petición
      return this.http.post(`${this.apiUrl}/login`, loginDTO);
    }
    //Metodo con el que obtenemos el correo a partir del token
    getEmailFromToken(): string | null {
      const token = this.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.nombre;
      }
      return null;
    }


    getUserInfo(email: string): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
      return this.http.get<any>(`${this.apiUrl}/${email}`, { headers }).pipe(
        tap(userInfo => {
          // Guarda la información del usuario en el almacenamiento local
          localStorage.setItem('user', JSON.stringify(userInfo));
        })
      );
    }
    //Obtiene la información del usuario desde el localStorage  
    getUser(): any {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }

    //Método para verificar el rol de una cuenta dado el email
    verificarRol(email: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/verificar-rol/${email}`, null); // Enviando null ya que no se espera un cuerpo adicional
    }
    
    // Guardar el token en el localStorage
    saveToken(token: string): void {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem('authToken', token);
      }
    }

    // Obtener el token almacenado
    getToken(): string | null {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return sessionStorage.getItem('authToken');
      }
      return null;
    }

  // Método para redirigir al usuario después del login
  redirectToDashboard(rol: string): void {
    if (rol === 'ADMINISTRADOR') {
      this.router.navigate(['/admin/dashboard/events']);
    } else {
      this.router.navigate(['/user/dashboard']);
    }
  }

  //------------------METODOS PARA CREACIÓN Y ACTIVACIÓN DE CUENTA-----------

  crearCuenta(cuentaDTO: CrearCuentaRegistroDTO) :Observable<MessageDTO>{
    return this.http.post<MessageDTO>(`${this.apiUrl}/crear-cuenta`, cuentaDTO);
  }
  validarCodigo(validarCodigoDTO: ValidarCodigoDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(`${this.apiUrl}/validar-codigo`, validarCodigoDTO);
  }

}
