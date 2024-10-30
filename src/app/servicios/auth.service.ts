import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CrearCuentaRegistroDTO } from '../models/CrearCuentaRegistroDTO';
import { MessageDTO } from '../models/message.dto';
import { ValidarCodigoDTO } from '../models/VerificarCodigoDTO';

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
