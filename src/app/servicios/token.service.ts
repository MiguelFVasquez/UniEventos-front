import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";

@Injectable({
 providedIn: 'root'
})
export class TokenService {


 constructor(private router: Router) { }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveToken(token: string): void {
    sessionStorage.setItem('TOKEN_KEY', token);
  }
  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string) {
    this.setToken(token);

 }

 public logout() {
    window.sessionStorage.clear();
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }
  
  public getIDCuenta(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id;
    }
    return "";
   }
   
   
   public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      if (values && values.rol) {
        return values.rol;
      } else {
        console.warn('El campo "rol" no está presente en el token.');  
      }
    } else {
      console.warn('Token no encontrado en sessionStorage.');
    }
    return "";
  }
  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return "";
   }
   
   
}
