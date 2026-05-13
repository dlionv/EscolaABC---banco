import { Component, inject, OnInit } from '@angular/core';
import { Card } from "./components/card/card";
import { EscolaService } from '../../../services/escola.service';

@Component({
  selector: 'app-corpo',
  imports: [Card],
  templateUrl: './corpo.html',
  styleUrl: './corpo.css',
})
export class Corpo implements OnInit{
  escolaService = inject(EscolaService);

  totalAlunos: number = 0;
  totalProfessores: number = 0;
  totalTurmas: number = 0;
  
  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.escolaService.getAlunos().subscribe({
      next: (alunos) => { this.totalAlunos = alunos.length; },
      error: () => { this.totalAlunos = 0; }
    });

    this.escolaService.getProfessores().subscribe({
      next: (professores) => { this.totalProfessores = professores.length; },
      error: () => { this.totalProfessores = 0; }
    });

    this.escolaService.getTurmas().subscribe({
      next: (turmas) => { this.totalTurmas = turmas.length; },
      error: () => { this.totalTurmas = 0; }
    });
  }
}
