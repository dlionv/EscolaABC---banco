import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EscolaService } from '../../services/escola.service';
import { Header } from "../components/header/header";
import { Principal } from "../../login/principal/principal";
import { Corpo } from "../components/corpo/corpo";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Corpo],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  totalAlunos: number = 0;
  totalTurmas: number = 0;
  carregando: boolean = true;

  menuItems = [
    { label: 'Dashboard',   icon: '⊞', rota: '/dashboard' },
    { label: 'Alunos',      icon: '👤', rota: '/alunos' },
    { label: 'Professores', icon: '🎓', rota: '/professores' },
    { label: 'Disciplinas', icon: '📚', rota: '/disciplinas' },
    { label: 'Notas',       icon: '📝', rota: '/notas' },
    { label: 'Relatórios',  icon: '📊', rota: '/relatorios' },
  ];

  constructor(
    private escolaService: EscolaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarResumo();
  }

  carregarResumo(): void {
    this.carregando = true;

    // GET /alunos (sem filtro = retorna todos)
    this.escolaService.getAlunos().subscribe({
      next: (alunos) => { this.totalAlunos = alunos.length; },
      error: () => { this.totalAlunos = 0; }
    });

    // GET /turmas
    this.escolaService.getTurmas().subscribe({
      next: (turmas) => {
        this.totalTurmas = turmas.length;
        this.carregando = false;
      },
      error: () => {
        this.totalTurmas = 0;
        this.carregando = false;
      }
    });

    // Nota: totalDisciplinas não é possível via API atual.
    // Caso queira exibir, implemente GET /disciplinas no backend.
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}