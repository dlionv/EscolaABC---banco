import { Routes } from '@angular/router';
import { Principal } from './login/principal/principal';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { AlunoComponent } from './aluno/aluno/aluno';

export const routes: Routes = [
    {path: 'login', component: Principal},
    { path: '', component: DashboardComponent },
    {path: 'alunos', component: AlunoComponent}
];
