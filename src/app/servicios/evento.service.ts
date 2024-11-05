import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MensajeDTO } from '../models/mensaje-dto';
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; 
import { Page } from '../models/Page';
import { ItemEventoDTO } from '../models/ItemEventoDTO ';
@Injectable({
  providedIn: 'root'
})
  export class EventoService {
    private apiUrl = 'http://localhost:8080/api/evento'; 

    constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

    /*
    listarTodosEventos(): Observable<MensajeDTO>{
      return this.http.get<MensajeDTO>(`${this.apiUrl}/getAll`);
    }*/

    //Metodo con el que obtenemos el total de los eventos activos
    getEventosActivos(pagina: number, size: number) {
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      
      return this.http.get<Page<ItemEventoDTO>>(`${this.apiUrl}/activos?page=${pagina}&size=${size}`, { headers })
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
    
    //Metodo con el que obtenemos el total de los eventos inactivos
    getEventosInactivos(pagina: number, size: number) {
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      
      return this.http.get<Page<ItemEventoDTO>>(`${this.apiUrl}/inactivos?page=${pagina}&size=${size}`, { headers })
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
