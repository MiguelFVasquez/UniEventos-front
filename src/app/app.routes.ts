import { Routes } from '@angular/router';
import { LoginComponent } from './log-in/log-in.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { CuponBoardComponent } from './cupon-board/cupon-board.component';
import { ReporteComponent } from './reporte/reporte.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { Component } from '@angular/core';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { MiCuentaUserComponent } from './mi-cuenta-user/mi-cuenta-user.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EventoBoardComponent } from './evento-board/evento-board.component';
import { ValidarCodigoComponent } from './validar-codigo/validar-codigo.component';
import { ActivarCuentaComponent } from './activar-cuenta/activar-cuenta.component';


export const routes: Routes = [
    { path: 'log-in', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    {path: 'validar-codigo', component: ValidarCodigoComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path: 'activar-cuenta',component: ActivarCuentaComponent},
    //Ruta anindada
    {
      path: 'admin',
      component: AdminHeaderComponent, // Siempre muestra el AdminHeader
      children: [
        {
          path: 'dashboard',
          component: AdminDashBoardComponent, // Renderiza el AdminDashBoard
          children: [
            { path: 'mi-cuenta', component: MiCuentaComponent },  // Mi Cuenta como hijo del dashboard
            { path: 'events', component: EventoBoardComponent },       // Eventos como hijo del dashboard
            { path: 'coupons', component: CuponBoardComponent },     // Cupones como hijo del dashboard
            { path: 'reportes', component: ReporteComponent },
          ]
        }
      ]
    },

    {
      path: 'user',
      component: UserHeaderComponent, //Siempre muestra el userHeader
      children:[
        {
          path: 'dashboard',
          component: UserDashBoardComponent,
          children:[
            { path: 'user-mi-cuenta', component: MiCuentaUserComponent},
            {path: 'carrito', component: CarritoComponent},
            {path: 'change-password', component: ChangePasswordComponent}

          ]
        }
      ]
    },
    { path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: '**', redirectTo: '/log-in' }, 

];  
