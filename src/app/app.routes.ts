import { Routes } from '@angular/router';
import { Principal } from './login/principal/principal';
import { DashboardComponent } from './dashboard/dashboard/dashboard';

export const routes: Routes = [
    {path: 'login', component: Principal},
    { path: '', component: DashboardComponent }
];
