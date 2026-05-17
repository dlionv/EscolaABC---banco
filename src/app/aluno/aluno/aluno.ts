import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaService } from '../../services/escola.service';
import { Aluno, Turma } from '../../models/escola.model';
import { ModalAlunoComponent } from './components/modal-aluno/modal-aluno';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [CommonModule, ModalAlunoComponent],
  templateUrl: './aluno.html',
  styleUrl: './aluno.css'
})
export class AlunoComponent implements OnInit {
  alunos: Aluno[] = [];
  turmas: Turma[] = [];
  modalAberto = false;
  alunoSelecionado: Aluno | null = null;

  constructor(private escolaService: EscolaService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarAlunos();
    this.carregarTurmas();
  }

  carregarAlunos() {
    this.escolaService.getAlunos().subscribe({
      next: (data) => {
        console.log('Alunos:', data);
        this.alunos = [...data]
        this.cdr.detectChanges();},
      error: () => this.alunos = []
    });
  }

  carregarTurmas() {
    this.escolaService.getTurmas().subscribe({
      next: (data) => this.turmas = data,
      error: () => this.turmas = []
    });
  }

  abrirModal(aluno?: Aluno) {
    this.alunoSelecionado = aluno ?? null;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.alunoSelecionado = null;
  }

  onSalvo() {
  this.carregarAlunos();
  this.fecharModal();
}

  excluir(matricula: number) {
    if (!confirm('Deseja excluir este aluno?')) return;
    this.escolaService.excluirAluno(matricula).subscribe({
      next: () => this.carregarAlunos(),
      error: (err) => alert(err.error?.detail ?? 'Erro ao excluir.')
    });
  }
}