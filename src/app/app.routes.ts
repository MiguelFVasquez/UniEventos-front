import { Routes } from '@angular/router';
import { LoginComponent } from './log-in/log-in.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';

export const routes: Routes = [
    { path: 'log-in', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },

    //Ruta anindada
    {
      path: 'admin',
      component: AdminHeaderComponent, // Muestra el AdminHeader siempre
      children: [
        { path: 'dashboard', component: AdminDashBoardComponent }, // AdminDashBoard como hijo
      ]
    },

    { path: '', redirectTo: '/log-in', pathMatch: 'full' },
    { path: '**', redirectTo: '/log-in' }, 

];  
