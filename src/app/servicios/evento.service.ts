import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { MensajeDTO } from '../models/mensaje-dto';
@Injectable({
  providedIn: 'root'
})
  export class EventoService {
    private apiUrl = 'http://localhost:8080/api/evento'; 

    constructor(private http: HttpClient, private router: Router) {}

    listarTodosEventos(): Observable<MensajeDTO>{
      return this.http.get<MensajeDTO>(`${this.apiUrl}/getAll`);
    }


}
