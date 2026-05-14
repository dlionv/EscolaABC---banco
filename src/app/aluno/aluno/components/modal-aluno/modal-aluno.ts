import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Aluno, AlunoCreate, Turma } from '../../../../models/escola.model';
import { EscolaService } from '../../../../services/escola.service';

@Component({
  selector: 'app-modal-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-aluno.html',
  styleUrl: './modal-aluno.css'
})
export class ModalAlunoComponent implements OnInit {
  @Input() alunoEditando: Aluno | null = null;
  @Input() turmas: Turma[] = [];
  @Output() fechar = new EventEmitter<void>();
  @Output() salvo = new EventEmitter<void>();

  editando = false;
  erro = '';
  sucesso = '';

  form: AlunoCreate = this.formVazio();

  constructor(private escolaService: EscolaService) {}

  ngOnInit() {
    if (this.alunoEditando) {
      this.editando = true;
      this.form = {
        matricula: this.alunoEditando.matricula,
        nome_aluno: this.alunoEditando.nome_aluno,
        telefone_aluno: this.alunoEditando.telefone_aluno,
        email_aluno: this.alunoEditando.email_aluno,
        data_nasc: this.alunoEditando.data_nasc,
        sexo: this.alunoEditando.sexo,
        id_turma: Number(this.alunoEditando.id_turma)
      };
    }
  }

  formVazio(): AlunoCreate {
    return {
      matricula: 0,
      nome_aluno: '',
      telefone_aluno: '',
      email_aluno: '',
      data_nasc: '',
      sexo: '',
      id_turma: 0
    };
  }

  onFechar() {
    this.fechar.emit();
  }

  salvar() {
    console.log('Form:', this.form);
    this.erro = '';
    this.sucesso = '';

    if (this.editando) {
      this.escolaService.atualizarAluno(this.form.matricula, this.form).subscribe({
        next: (res) => {
          this.sucesso = res.message;
          setTimeout(() => this.salvo.emit(), 1000);
        },
        error: (err) => this.erro = err.error?.detail ?? 'Erro ao atualizar.'
      });
    } else {
      this.escolaService.cadastrarAluno(this.form).subscribe({
        next: (res) => {
          this.sucesso = res.message;
          setTimeout(() => this.salvo.emit(), 1000);
        },
        error: (err) => this.erro = err.error?.detail ?? 'Erro ao cadastrar.'
      });
    }
  }
}