import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./pages/ingreso/ingreso.page').then( m => m.IngresoPage),
    canActivate: [loginGuard]
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage),
    canActivate: [homeGuard]
  },
  {
    path: 'miruta',
    loadComponent: () => import('./pages/miruta/miruta.page').then( m => m.MirutaPage)
  },
  {
    path: 'temas',
    loadComponent: () => import('./pages/temas/temas.page').then( m => m.TemasPage)
  },
  {
    path: 'mis-datos',
    loadComponent: () => import('./pages/mis-datos/mis-datos.page').then( m => m.MisDatosPage)
  }
];
