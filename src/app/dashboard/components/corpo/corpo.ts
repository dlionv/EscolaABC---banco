import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "./components/card/card";
import { EscolaService } from '../../../services/escola.service';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-corpo',
  imports: [CardComponent, RouterLink],
  standalone: true,
  templateUrl: './corpo.html',
  styleUrls: ['./corpo.css'],
})
export class Corpo implements OnInit{
  cdr = inject(ChangeDetectorRef);
  escolaService = inject(EscolaService);

  totalAlunos: number = 0;
  totalProfessores: number = 0;
  totalTurmas: number = 0;
  
  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {

  console.log('INICIO');

  forkJoin({
    alunos: this.escolaService.getAlunos(),
    professores: this.escolaService.getProfessores(),
    turmas: this.escolaService.getTurmas()
  }).subscribe({

    next: ({ alunos, professores, turmas }) => {

      console.log('NEXT');

      console.log(alunos);

      this.totalAlunos = alunos.length;

      console.log('TOTAL:', this.totalAlunos);

      this.totalProfessores = professores.length;
      this.totalTurmas = turmas.length;
      this.cdr.detectChanges();
    },

    error: (err) => {

      console.log('ERROR');
      console.log(err);

      this.totalAlunos = 0;
      this.totalProfessores = 0;
      this.totalTurmas = 0;
    }

  });
}
}
