// cupon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearCuponDTO } from '../models/crear-cupon.dto'; // Asegúrate de tener este DTO
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private apiUrl = 'http://localhost:8080/api/cupon'; // URL del backend

  constructor(private http: HttpClient, private authService: AuthService) {}

    // Método para obtener cupones
  obtenerCupones(): Observable<any[]> {
    const token = this.authService.getToken(); // Obtener el token del servicio de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados

    return this.http.get<any[]>(this.apiUrl, { headers }); // Enviar la solicitud con los encabezados
  }
  


  // Método para guardar un cupón
  guardarCupon(cuponDTO: CrearCuponDTO): Observable<MessageDTO> {
    const token = this.authService.getToken(); // Obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token a los encabezados

    return this.http.post<MessageDTO>(`${this.apiUrl}/save`, cuponDTO, { headers }); // Enviar la solicitud con los encabezados
  }
}
