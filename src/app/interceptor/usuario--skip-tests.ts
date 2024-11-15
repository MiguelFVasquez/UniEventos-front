import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../servicios/token.service';


export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {


 const tokenService = inject(TokenService);
 const isApiAuth = req.url.includes("api/auth");
 const isAPiPublico = req.url.includes("api/publico");