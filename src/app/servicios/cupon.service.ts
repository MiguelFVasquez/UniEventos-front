// cupon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearCuponDTO} from '../models/crear-cupon.dto';
import { EditarCuponDTO} from '../models/editar-cupon-dto';
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; 
import { Page } from '../models/Page';

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private apiUrl = 'http://localhost:8080/api/cupon'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

    // Método para obtener cupones
  obtenerCupones(pagina: number, tamanio: number): Observable<Page<any>> {
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados

    // Asegúrate de que la URL esté correctamente configurada para aceptar parámetros de paginación
    return this.http.get<Page<any>>(`${this.apiUrl}?page=${pagina}&size=${tamanio}`, { headers });
  }
  //Metodo para obtener los cupones disponibles
  obtenerCuponesDisponibles(pagina:number, size: number){
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados}
    return this.http.get<Page<any>>(`${this.apiUrl}/disponibles?page=${pagina}&size=${size}`, { headers });
  }
  //
  obtenerCuponesNoDisponibles(pagina:number, size: number){
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados}
    return this.http.get<Page<any>>(`${this.apiUrl}/no-disponibles?page=${pagina}&size=${size}`, { headers });
  }
  // Método para guardar un cupón
  guardarCupon(cuponDTO: CrearCuponDTO): Observable<MessageDTO> {
    const token = this.authService.getToken(); // Obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados

    return this.http.post<MessageDTO>(`${this.apiUrl}/save`, cuponDTO, { headers }); // Enviar la solicitud con los encabezados
  }

  eliminarCupon(id: string): Observable<MessageDTO> {
    const token = this.authService.getToken(); // Obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
    return this.http.delete<MessageDTO>(`${this.apiUrl}/${id}`, { headers }); // Enviar la solicitud DELETE con los encabezados
  }

  actualizarCupon(id: string, cuponDTO: EditarCuponDTO): Observable<MessageDTO> {
    const token = this.authService.getToken(); // Obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados
    return this.http.put<MessageDTO>(`${this.apiUrl}/${id}`, cuponDTO, { headers });
  }
}
