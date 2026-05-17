import { Routes } from '@angular/router';
import { Principal } from './login/principal/principal';
import { AlunoComponent } from './aluno/aluno/aluno';
import { ProfessorComponent } from './professor/professor';
import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { Notas } from './notas/notas';
import { Corpo } from './dashboard/components/corpo/corpo';

export const routes: Routes = [
    { path: '', component: Principal },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '',            component: Corpo },
            { path: 'alunos',      component: AlunoComponent },
            { path: 'professores', component: ProfessorComponent },
            { path: 'notas',       component: Notas },
        ]
    },
];