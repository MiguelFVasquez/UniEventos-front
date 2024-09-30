import { Routes } from '@angular/router';
import { LoginComponent } from './log-in/log-in.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { CuponBoardComponent } from './cupon-board/cupon-board.component';

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
            //{ path: 'reportes', component: CouponsComponent },
          ]
        }
      ]
    },

    { path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: '**', redirectTo: '/log-in' }, 

];  
