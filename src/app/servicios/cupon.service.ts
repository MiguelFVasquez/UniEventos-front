// cupon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearCuponDTO} from '../models/crear-cupon.dto';
import { EditarCuponDTO} from '../models/editar-cupon-dto';
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; 
import { Page } from '../models/Page';
import { RedimirCuponDTO } from '../models/RedimirCuponDTO';
import { MensajeDTO } from '../models/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private apiUrl = 'https://unieventos-fuk1.onrender.com/api/cupon'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

    // Método para obtener cupones
  obtenerCupones(pagina: number, tamanio: number): Observable<Page<any>> {
    // Asegúrate de que la URL esté correctamente configurada para aceptar parámetros de paginación
    return this.http.get<Page<any>>(`${this.apiUrl}?page=${pagina}&size=${tamanio}`);
  }
  //Metodo para obtener los cupones disponibles
  obtenerCuponesDisponibles(pagina:number, size: number){
    return this.http.get<Page<any>>(`${this.apiUrl}/disponibles?page=${pagina}&size=${size}`);
  }
  //
  obtenerCuponesNoDisponibles(pagina:number, size: number){
    return this.http.get<Page<any>>(`${this.apiUrl}/no-disponibles?page=${pagina}&size=${size}`);
  }
  // Método para guardar un cupón
  guardarCupon(cuponDTO: CrearCuponDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(`${this.apiUrl}/save`, cuponDTO); // Enviar la solicitud con los encabezados
  }

  eliminarCupon(id: string): Observable<MessageDTO> {
    return this.http.delete<MessageDTO>(`${this.apiUrl}/${id}`); // Enviar la solicitud DELETE con los encabezados
  }

  actualizarCupon(id: string, cuponDTO: EditarCuponDTO): Observable<MessageDTO> {
    return this.http.put<MessageDTO>(`${this.apiUrl}/${id}`, cuponDTO);
  }
  redimirCupon(redimirCupon : RedimirCuponDTO){
    return this.http.post<MensajeDTO>(`${this.apiUrl}/redimir`, redimirCupon);
  }

  

}
