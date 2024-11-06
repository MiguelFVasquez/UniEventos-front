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
import { Evento } from '../models/evento';
import { FiltroEventoDTO } from '../models/filtro-evento-dto';
@Injectable({
  providedIn: 'root'
})
  export class EventoService {
    private apiUrl = 'http://localhost:8080/api/evento'; 

    constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}
    
    filtrarEventos(filtroEventoDTO: FiltroEventoDTO): Observable<MensajeDTO>{
      return this.http.post<MensajeDTO>(`${this.apiUrl}/filtrarEventos`, filtroEventoDTO);
    }
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
              direccion: item.direccion,
              id: item.id
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
              direccion: item.direccion,
              id: item.id
            }));
            return { ...data, content: eventos }; // Devolver la respuesta transformada
          })
        );
    }

    getEventoById(eventId: string): Observable<Evento> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      return this.http.get<Evento>(`${this.apiUrl}/${eventId}`, { headers }).pipe(
        map((data: Evento) => {
          // Asegúrate de que la fecha esté en formato de array
          if (Array.isArray(data.fecha) && data.fecha.length === 5) {
            // Convertir el array de la fecha a un objeto Date
            const fecha = new Date(
              data.fecha[0],       // Año
              data.fecha[1] - 1,   // Mes (ajustamos para que sea 0-11)
              data.fecha[2],       // Día
              data.fecha[3],       // Hora
              data.fecha[4]        // Minutos
            );
            return { ...data, fecha: fecha }; // Asigna la fecha transformada
          }
          return data; // Si la fecha no está en el formato esperado, retornamos los datos sin cambios
        })
      );
    } 
    
    //Metodo con el que se elimina el evento
    eliminarEvento(id:string): Observable<MensajeDTO>{
      const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
      return this.http.delete<MensajeDTO>(`${this.apiUrl}/${id}`,{headers});
    }
}
