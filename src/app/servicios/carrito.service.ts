import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MensajeDTO } from '../models/mensaje-dto';
import { CarritoDTO } from '../models/carritoDTO';

@Injectable({
  providedIn: 'root'
})
  export class CarritoService {
    private apiUrl = 'http://localhost:8080/api/carrito'; 

    constructor(private http: HttpClient, private router: Router) {
    }

    listarElementos(idUsuario: string): Observable<MensajeDTO>{
      return this.http.get<MensajeDTO>(`${this.apiUrl}/listarElementos-carrito/${idUsuario}`);
    }

    eliminarElemento(carritoDTO: CarritoDTO): Observable<MensajeDTO>{
      return this.http.delete<MensajeDTO>(`${this.apiUrl}/eliminarEvento-carrito`);
    }
     
    vaciarCarrito(idCarrito: string): Observable<MensajeDTO>{
      return this.http.delete<MensajeDTO>(`${this.apiUrl}/vaciarCarrito/${idCarrito}`);
    
    }

    obtenerCantElemCarrito(idCarrito: string): Observable<MensajeDTO>{
      return this.http.get<MensajeDTO>(`${this.apiUrl}/obtenerCantidadItems/${idCarrito}`);
    }


}