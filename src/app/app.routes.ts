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
import { BusquedaInicioPrincipalComponent } from './busqueda-inicio-principal/busqueda-inicio-principal.component';
import { HeaderInicioPrincipalComponent } from './header-inicio-principal/header-inicio-principal.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventDetailAdminComponent } from './event-detail-admin/event-detail-admin.component';


export const routes: Routes = [
    { path: 'log-in', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    {path: 'validar-codigo', component: ValidarCodigoComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path: 'carrito',component: CarritoComponent},
    {path: 'activar-cuenta',component: ActivarCuentaComponent},
    {path: 'inicio-principal', component: BusquedaInicioPrincipalComponent},
    {path: 'event-detail', component: EventDetailComponent},
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
            { path: 'events', component: EventoBoardComponent },   
            { path: 'events/detail/:id', component: EventDetailAdminComponent },    // Eventos como hijo del dashboard
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
    { path: '', redirectTo: '/inicio-principal', pathMatch: 'full' },
    { path: '**', redirectTo: '/inicio-principal' }, 

];  
