import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    
    validarCodigo(email: string, codigo: string){
      const validarDTO = {email, codigo};
      return this.http.post(`${this.apiUrl}/validar-codigo`, validarDTO);
    }

    // Guardar el token en el localStorage
    saveToken(token: string): void {
      localStorage.setItem('authToken', token);
    }

    // Obtener el token almacenado
    getToken(): string | null {
      return localStorage.getItem('authToken');
    }

  // Método para redirigir al usuario después del login
  redirectToDashboard(rol: string): void {
    if (rol === 'ADMINISTRADOR') {
      this.router.navigate(['/admin/dashboard/events']);
    } else {
      this.router.navigate(['/user/dashboard']);
    }
  }
}
