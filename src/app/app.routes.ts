import { Routes } from '@angular/router';
import { Expedientes } from './pages/expedientes/expedientes';
// Update the path below if the actual file name or folder is different
import { Autorizaciones } from './pages/autorizaciones/autorizaciones';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: 'expedientes', component: Expedientes },
    { path: 'autorizaciones', loadComponent() { // Lazy load the Autorizaciones component
        return import('./pages/autorizaciones/autorizaciones').then(m => m.Autorizaciones);
    }},
    { path: '**', redirectTo: 'home' },
    //{path: '', redirectTo: 'home'},
    {path: 'login', component: Login} ,
    {path: 'home', component: Home} 
];
