import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; 
import { map, tap } from 'rxjs/operators';
import { InfoAdicionalDTO } from '../models/InfoAdicionalDTO';
@Injectable({
  providedIn: 'root'
})
export class MiCuentaService {
  private apiUrl= 'http://localhost:8080/api/cuenta'; 
  constructor(private http: HttpClient, private authService: AuthService,private router: Router) { }

  //Metodo para la eliminación de la cuenta
  eliminarCuenta(email: string): Observable<MessageDTO> {
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
    return this.http.delete<MessageDTO>(`${this.apiUrl}/eliminar-cuenta/${email}`, { headers });
  }
  editarCuenta(infoCuenta:InfoAdicionalDTO) :Observable<MessageDTO> {
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
    return this.http.put<MessageDTO>(`${this.apiUrl}/editar-cuenta`, infoCuenta, { headers });
  }

}
