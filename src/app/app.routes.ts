import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Listado } from './components/listado/listado';
import { Detalle } from './components/detalle/detalle';
import { Error } from './components/error/error';
import { Buscador } from './components/buscador/buscador';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'buscador', component: Buscador },
    { path: 'listado', component: Listado },
    { path: 'detalle/:id', component: Detalle },
    { path: '', component: Home },
    { path: '**', pathMatch: 'full', component: Error }
];
