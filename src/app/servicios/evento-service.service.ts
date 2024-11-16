import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MensajeDTO } from '../models/mensaje-dto';
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; 
import { Page } from '../models/Page';
import { Evento } from '../models/evento';
import { FiltroEventoDTO } from '../models/filtro-evento-dto';
import { CrearEvento } from '../models/CrearEvento';
import { ItemEventoDTO } from '../models/item-evento-dto';
@Injectable({
  providedIn: 'root'
})
  export class EventoService {
    private apiUrl = 'https://unieventos-fuk1.onrender.com/api/evento'; 

    constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}
    
    
    //Metodo con el que obtenemos el total de los eventos activos
    getEventosActivos(pagina: number, size: number):Observable<Page<ItemEventoDTO>> {  
      return this.http.get<Page<ItemEventoDTO>>(`${this.apiUrl}/activos?page=${pagina}&size=${size}`);
    }
    
    //Metodo con el que obtenemos el total de los eventos inactivos
    getEventosInactivos(pagina: number, size: number):Observable<Page<ItemEventoDTO>> {    
      return this.http.get<Page<ItemEventoDTO>>(`${this.apiUrl}/inactivos?page=${pagina}&size=${size}`);
    }

    getEventoById(eventId: string): Observable<Evento> {
      return this.http.get<Evento>(`${this.apiUrl}/${eventId}`).pipe(
        map((data: Evento) => {
          // Asegúrate de que la fecha esté en formato de array
          if (Array.isArray(data.fecha) && data.fecha.length >= 6) {
            // Convertir el array de la fecha a un objeto Date
            const fecha = new Date(
              data.fecha[0],       // Año
              data.fecha[1] - 1,   // Mes (ajustamos para que sea 0-11)
              data.fecha[2],       // Día
              data.fecha[3],       // Hora
              data.fecha[4],       // Minutos
              data.fecha[5]        // Segundos
            );
            return { ...data, fecha: fecha }; // Asigna la fecha transformada
          }
          return data; // Si la fecha no está en el formato esperado, retornamos los datos sin cambios
        })
      );
    }
    
    //Metodo para crear un nuevo evento

    crearEventoConArchivos(
      evento: CrearEvento,
      imagenPortada: File | null,
      imagenLocalidades: File | null
  ): Observable<any> {
      const formData = new FormData();
  
      // Serializa solo los campos del evento, sin incluir imágenes en el JSON.
      formData.append('evento', new Blob([JSON.stringify({
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          direccion: evento.direccion,
          ciudad: evento.ciudad,
          fecha: evento.fecha,
          tipo: evento.tipo,
          localidades: evento.localidades,
      })], { type: 'application/json' }));
  
      if (imagenPortada) {
          formData.append('portada', imagenPortada);
      }
      if (imagenLocalidades) {
          formData.append('localidades', imagenLocalidades);
      }
  
      return this.http.post(`${this.apiUrl}/save`, formData);
    }

    updateEvento(
      id: string,
      evento: CrearEvento, // Asegúrate de que CrearEvento tenga los campos correctos para tu modelo
      imagenPortada: File | null,
      imagenLocalidades: File | null
    ): Observable<any> {
      const formData = new FormData();
      
      // Serializa solo los campos del evento (sin imágenes) para incluirlos en FormData
      formData.append('evento', new Blob([JSON.stringify({
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        direccion: evento.direccion,
        ciudad: evento.ciudad,
        fecha: evento.fecha,
        tipo: evento.tipo,
        localidades: evento.localidades, // Asegúrate de enviar las localidades si es necesario
      })], { type: 'application/json' }));
      
      // Añadimos las imágenes si están disponibles
      if (imagenPortada) {
        formData.append('portada', imagenPortada);  // Agrega la portada como un archivo
      }
      if (imagenLocalidades) {
        formData.append('localidades', imagenLocalidades);  // Agrega las localidades como un archivo
      }
      
      // Hacemos la solicitud PUT al backend
      return this.http.put(`${this.apiUrl}/update/${id}`, formData);
    }
    
  
    
    
    //Metodo con el que se elimina el evento
    eliminarEvento(id:string): Observable<MensajeDTO>{
      return this.http.delete<MensajeDTO>(`${this.apiUrl}/${id}`);
    }

    //-------------------Reportes PDF----------------------------------
    //Metodo para generar el reporte de un evento dado el id

    generarReportePdf(id: string):Observable<Blob>{
      return this.http.get(`${this.apiUrl}/generar-reporte-pdf/${id}`,{responseType:'blob'}); //Para manejar el pdf como un blob
    }
    //
    generarReportePdfInactivos(): Observable<Blob>{
      return this.http.get(`${this.apiUrl}/generar-reporte-inactivos-pdf`,{responseType:'blob'}); //Para manejar el pdf como un blob
    }
//--------------------Reportes web--------------------------------
    //Genara el reporte web de un evento en especifico
    generarReporteWeb(eventoId: string):Observable<any>{
      return this.http.get(`${this.apiUrl}/generar-reporte-web/${eventoId}`)
    }
    //Genera el reporte web de todos los eventos inactivos
    generarReporteWebInactivos(): Observable<any>{
      return this.http.get(`${this.apiUrl}/generar-reporte-inactivos-web`)
    }
}
