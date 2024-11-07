import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; 
import { InfoAdicionalDTO } from '../models/InfoAdicionalDTO';
@Injectable({
  providedIn: 'root'
})
export class MiCuentaUserServiceService {
  private apiUrl= 'http://localhost:8080/api/cuenta/user'; //url para el controller del user
  constructor(private http: HttpClient, private authService: AuthService,private router: Router) { }


  eliminarCuentaUser(email:string):Observable<MessageDTO>{
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
    return this.http.delete<MessageDTO>(`${this.apiUrl}/eliminar-cuenta/${email}`, { headers });
  }
  editarCuentaUser(infoCuenta:InfoAdicionalDTO) :Observable<MessageDTO> {
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
    return this.http.put<MessageDTO>(`${this.apiUrl}/editar-cuenta`, infoCuenta, { headers });
  }


}
