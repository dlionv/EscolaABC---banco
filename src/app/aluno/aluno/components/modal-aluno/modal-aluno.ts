import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Aluno, AlunoCreate, AlunoUpdate, Turma } from '../../../../models/escola.model';
import { EscolaService } from '../../../../services/escola.service';
import { FormResponsavelComponent } from './forms/form-responsavel/form-responsavel';

@Component({
  selector: 'app-modal-aluno',
  standalone: true,
  imports: [CommonModule, FormsModule, FormResponsavelComponent, FormResponsavelComponent],
  templateUrl: './modal-aluno.html',
  styleUrl: './modal-aluno.css'
})
export class ModalAlunoComponent implements OnInit {
  @Input() alunoEditando: Aluno | null = null;
  @Input() turmas: Turma[] = [];
  @Output() fechar = new EventEmitter<void>();
  @Output() salvo = new EventEmitter<void>();

  // Acessa o componente filho para chamar cadastrarSeNecessario()
  @ViewChild('formResponsavel') formResponsavel?: FormResponsavelComponent;

  editando = false;
  erro = '';
  sucesso = '';
  salvando = false;

  form: AlunoCreate = this.formVazio();

  constructor(private escolaService: EscolaService) {}

  ngOnInit() {
    if (this.alunoEditando) {
      this.editando = true;
      this.form = {
        matricula:       this.alunoEditando.matricula,
        nome_aluno:      this.alunoEditando.nome_aluno,
        telefone_aluno:  this.alunoEditando.telefone_aluno,
        email_aluno:     this.alunoEditando.email_aluno,
        data_nasc:       this.alunoEditando.data_nasc,
        sexo:            this.alunoEditando.sexo,
        id_turma:        Number(this.alunoEditando.id_turma),
        cpf_responsavel: ''
      };
    }
  }

  formVazio(): AlunoCreate {
    return {
      matricula: 0, nome_aluno: '', telefone_aluno: '',
      email_aluno: '', data_nasc: '', sexo: '',
      id_turma: 0, cpf_responsavel: ''
    };
  }

  onFechar() {
    this.fechar.emit();
  }

  async salvar() {
    this.erro = '';
    this.sucesso = '';
    this.salvando = true;

    // ── Edição ──────────────────────────────────────────────
    if (this.editando) {
      const payload: AlunoUpdate = {
        nome_aluno:     this.form.nome_aluno,
        telefone_aluno: this.form.telefone_aluno,
        email_aluno:    this.form.email_aluno,
        data_nasc:      this.form.data_nasc,
        sexo:           this.form.sexo,
        id_turma:       this.form.id_turma
      };
      this.escolaService.atualizarAluno(this.form.matricula, payload).subscribe({
        next: (res) => {
          this.sucesso = res.message;
          this.salvando = false;
          setTimeout(() => this.salvo.emit(), 1000);
        },
        error: (err) => {
          this.erro = err.error?.detail ?? 'Erro ao atualizar.';
          this.salvando = false;
        }
      });
      return;
    }

    // ── Cadastro ─────────────────────────────────────────────
    if (!this.formResponsavel?.pronto) {
      this.erro = 'Busque o CPF do responsável antes de cadastrar.';
      this.salvando = false;
      return;
    }

    try {
      // Cadastra endereço + responsável se necessário, retorna o CPF
      const cpf = await this.formResponsavel.cadastrarSeNecessario();
      this.form.cpf_responsavel = cpf;

      this.escolaService.cadastrarAluno(this.form).subscribe({
        next: (res) => {
          this.sucesso = res.message;
          this.salvando = false;
          setTimeout(() => this.salvo.emit(), 1000);
        },
        error: (err) => {
          this.erro = err.error?.detail ?? 'Erro ao cadastrar aluno.';
          this.salvando = false;
        }
      });
    } catch (errMsg) {
      this.erro = errMsg as string;
      this.salvando = false;
    }
  }
}