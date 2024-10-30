import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessageDTO } from '../models/message.dto';
import { AuthService } from '../servicios/auth.service'; 
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MiCuentaService {
  private apiUrl= 'http://localhost:8080/api/cuenta'; 
  constructor(private http: HttpClient, private authService: AuthService,private router: Router) { }

  //Metodo en el que obtenemos la información adicional del usuario


}
