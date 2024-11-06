import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _password: string = '';

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
}