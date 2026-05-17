import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormEnderecoComponent } from '../../../aluno/aluno/components/modal-aluno/forms/form-endereco/form-endereco';
import { EnderecoCreate, ProfessorCreate } from '../../../models/escola.model';
import { EscolaService } from '../../../services/escola.service';

@Component({
  selector: 'app-modal-professor',
  standalone: true,
  imports: [CommonModule, FormsModule, FormEnderecoComponent],
  templateUrl: './modal-professor.html',
  styleUrl: './modal-professor.css'
})
export class ModalProfessorComponent {
  @Output() fechar = new EventEmitter<void>();
  @Output() salvo = new EventEmitter<void>();

  erro = '';
  sucesso = '';
  salvando = false;

  form = {
    nome_prof: '',
    email_prof: '',
    telefone_prof: ''
  };

  formEndereco: EnderecoCreate = {
    rua: '', numero: 0, bairro: '', cidade: '', uf: '', cep: ''
  };

  constructor(private escolaService: EscolaService, private cdr: ChangeDetectorRef) {}

  onFechar() {
    this.fechar.emit();
  }

  async salvar() {
    this.erro = '';
    this.sucesso = '';
    this.salvando = true;

    // 1. Cadastra endereço
    const endereco: EnderecoCreate = {
      ...this.formEndereco,
      numero: Number(this.formEndereco.numero),
      uf: this.formEndereco.uf.trim().toUpperCase().slice(0, 2),
      cep: this.formEndereco.cep.trim().replace(/\D/g, '').slice(0, 8)
    };

    this.escolaService.cadastrarEndereco(endereco).subscribe({
      next: (endRes) => {
        // 2. Cadastra professor com o id do endereço
        const payload: ProfessorCreate = {
          nome_prof:     this.form.nome_prof,
          email_prof:    this.form.email_prof,
          telefone_prof: this.form.telefone_prof,
          id_endereco:   endRes.id_endereco
        };

        this.escolaService.cadastrarProfessor(payload).subscribe({
          next: (res) => {
            this.sucesso = res.message;
            this.salvando = false;
            this.cdr.detectChanges();
            setTimeout(() => this.salvo.emit(), 1000);
          },
          error: (err) => {
            this.erro = err.error?.detail ?? 'Erro ao cadastrar professor.';
            this.salvando = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        this.erro = err.error?.detail ?? 'Erro ao cadastrar endereço.';
        this.salvando = false;
        this.cdr.detectChanges();
      }
    });
  }
}