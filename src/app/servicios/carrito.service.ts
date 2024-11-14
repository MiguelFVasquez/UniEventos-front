import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MensajeDTO } from '../models/mensaje-dto';
import { CarritoDTO } from '../models/carritoDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
  export class CarritoService {
    private apiUrl = 'http://localhost:8080/api/carrito'; 

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    }
    //Metodo para agregar un elemento 
    agregarEventoCarrito(agregarCarrito: CarritoDTO): Observable<MensajeDTO> {
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      return this.http.post<MensajeDTO>(`${this.apiUrl}/agregarEvento`, agregarCarrito, {headers});
    }

   listarElementos(idUsuario: string): Observable<MensajeDTO> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<MensajeDTO>(`${this.apiUrl}/listarElementos-carrito/${idUsuario}`, { headers });
    }

    eliminarElemento(carritoDTO: CarritoDTO): Observable<MensajeDTO>{
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      return this.http.request<MensajeDTO>("delete", `${this.apiUrl}/eliminarEvento-carrito`, {body: carritoDTO} );
    }
     
    vaciarCarrito(idCarrito: string): Observable<MensajeDTO>{
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      return this.http.delete<MensajeDTO>(`${this.apiUrl}/vaciarCarrito/${idCarrito}`);
    
    }

    obtenerCantElemCarrito(idCarrito: string): Observable<MensajeDTO>{
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      return this.http.get<MensajeDTO>(`${this.apiUrl}/obtenerCantidadItems/${idCarrito}`);
    }

    obtenerTotalCarrito(idCarrito: string): Observable<MensajeDTO>{
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      return this.http.get<MensajeDTO>(`${this.apiUrl}/getTotalCarrito/${idCarrito}`);
    }

    editarCantidad(carritoDTO: CarritoDTO): Observable<MensajeDTO>{
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      return this.http.put<MensajeDTO>(`${this.apiUrl}/editarCantidad`, carritoDTO);
    }

}