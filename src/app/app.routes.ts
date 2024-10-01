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

export const routes: Routes = [
    { path: 'log-in', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },

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
            //{ path: 'events', component: EventsComponent },       // Eventos como hijo del dashboard
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
            {path: 'carrito', component: CarritoComponent}

          ]
        }
      ]
    },

    { path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: '**', redirectTo: '/log-in' }, 

];  
