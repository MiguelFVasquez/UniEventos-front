import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CrearCuentaRegistroDTO } from '../models/CrearCuentaRegistroDTO';
import { MessageDTO } from '../models/message.dto';
import { ValidarCodigoDTO } from '../models/VerificarCodigoDTO';
import { map, tap } from 'rxjs/operators';
import { ChangePassword } from '../models/change-password';
import { Page } from '../models/Page';
import { ItemEventoDTO } from '../models/ItemEventoDTO ';
@Injectable({
  providedIn: 'root'
})
  export class AuthService {
    private apiUrl = 'http://localhost:8080/api/public'; 

    constructor(private http: HttpClient, private router: Router) {}

    listarTodosEventos(): Observable<any>{
      return this.http.get(`${this.apiUrl}/evento/getAll`);
    }

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
  //-------------------RECUPERACIÓN DE PASSWORD-------------------------------
  enviarCodigo(correo:string):Observable<MessageDTO>{
    return this.http.put<MessageDTO>(`${this.apiUrl}/enviarCodigoPassword/${correo}`,null);
  }
  cambiarPassword(cambioPasswordDTO: ChangePassword): Observable<MessageDTO>{
    return this.http.post<MessageDTO>(`${this.apiUrl}/cambiarPassword`, cambioPasswordDTO);
  }
  //----------------OBTENER LOS EVENTOS PARA LOS USUARIOS--------------------
  getEventosActivos(pagina: number, size: number) {  
    return this.http.get<Page<ItemEventoDTO>>(`${this.apiUrl}/eventos-activos?page=${pagina}&size=${size}`)
      .pipe(
        map((data: Page<ItemEventoDTO>) => {
          // Transformar el contenido de ItemEventoDTO a un formato adecuado para el frontend
          const eventos = data.content.map(item => ({
            urlImagenPoster: item.urlImagenPoster,
            nombre: item.nombre,
            fecha: new Date(item.fecha[0], item.fecha[1] - 1, item.fecha[2], item.fecha[3], item.fecha[4]), // Convertir la fecha
            direccion: item.direccion
          }));
          return { ...data, content: eventos }; // Devolver la respuesta transformada
        })
      );
  }

}
