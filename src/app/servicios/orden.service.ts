import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MensajeDTO } from '../models/mensaje-dto';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = 'https://unieventos-fuk1.onrender.com/api/orden'; 
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  realizarPago(idUsuario: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiUrl}/create-payment/${idUsuario}`, null, {
      responseType: 'json' as const
    });
  }

  obtenerHistorial(idUsuario: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/historial/${idUsuario}`);
  }
}
