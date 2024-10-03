import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user'; // Cambia esta URL por la del endpoint de tu backend

  constructor(private http: HttpClient) { }

  // Método para obtener la información del usuario
  getUserData(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
  //Metodo para actualizar la cuenta
  updateUserData(userId: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser);
  }
  //Metodo para eliminar la cuenta
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

}
