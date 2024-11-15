import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../servicios/token.service';
import { inject } from '@angular/core';

export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const isAPiPublico = req.url.includes("api/public");

  if (!tokenService.isLogged() || isAPiPublico) {
    return next(req);
  }
  const token = tokenService.getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
 
 
  return next(authReq);
};
