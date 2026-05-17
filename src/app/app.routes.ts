import { Routes } from '@angular/router';
import { Principal } from './login/principal/principal';
import { AlunoComponent } from './aluno/aluno/aluno';
import { ProfessorComponent } from './professor/professor';
import { DashboardComponent } from './dashboard/dashboard/dashboard';

export const routes: Routes = [
    {path: 'login', component: Principal},
    { path: '', component: DashboardComponent },
    {path: 'alunos', component: AlunoComponent},
    {path: 'professores', component: ProfessorComponent},
];
