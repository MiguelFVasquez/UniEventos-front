// cupon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearCuponDTO } from '../models/crear-cupon.dto'; // Asegúrate de tener este DTO
import { MessageDTO } from '../models/message.dto';

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private apiUrl = 'http://localhost:8080/cupon'; // URL del backend

  constructor(private http: HttpClient) {}

    // Método para obtener cupones
  obtenerCupones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  // Método para guardar un cupón
  guardarCupon(cuponDTO: CrearCuponDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(`${this.apiUrl}/save`, cuponDTO);
  }
}
