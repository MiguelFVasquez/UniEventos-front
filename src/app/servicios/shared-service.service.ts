import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _password: string = '';
  private _userId: string = '';
  private _carritoId: string = '';

  // Establecer la contraseña
  setPassword(password: string) {
    this._password = password;
  }

  // Obtener la contraseña
  getPassword(): string {
    return this._password;
  }

  // Limpiar la contraseña después de usarla
  clearPassword() {
    this._password = '';
  }

  // Establecer el userId
  setUserId(userId: string) {
    this._userId = userId;
  }

  // Obtener el userId
  getUserId(): string {
    return this._userId;
  }

  setCarritoId(carritoId: string) {
    this._carritoId = carritoId;
  }

  // Obtener el carritoId
  getCarritoId(): string {
    return this._carritoId;
  }
  
}