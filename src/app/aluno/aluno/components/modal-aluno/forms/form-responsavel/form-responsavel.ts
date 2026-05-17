import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormEnderecoComponent } from '../form-endereco/form-endereco';
import { EnderecoCreate, Responsavel, ResponsavelCreate } from '../../../../../../models/escola.model';
import { EscolaService } from '../../../../../../services/escola.service';

@Component({
  selector: 'app-form-responsavel',
  standalone: true,
  imports: [CommonModule, FormsModule, FormEnderecoComponent],
  templateUrl: './form-responsavel.html'
})
export class FormResponsavelComponent {
  @Output() responsavelPronto = new EventEmitter<string>();
  @Output() erroEmitido = new EventEmitter<string>();

  cpfBusca = '';
  buscando = false;
  mostrarForm = false;
  erro = '';

  responsavelEncontrado: Responsavel | null = null;

  novoResponsavel = { nome_resp: '', telefone_resp: '', email_resp: '' };
  novoEndereco: EnderecoCreate = {
    rua: '', numero: 0, bairro: '', cidade: '', uf: '', cep: ''
  };

  constructor(private escolaService: EscolaService, private cdr: ChangeDetectorRef) {}

  buscar() {
    this.cpfBusca = this.cpfBusca.trim().replace(/\D/g, '');
    if (!this.cpfBusca || this.cpfBusca.length !== 11) {
      this.erro = 'Digite um CPF válido com 11 dígitos.';
      return;
    }
    this.erro = '';
    this.buscando = true;
    this.mostrarForm = false;

    this.escolaService.getResponsavelPorCpf(this.cpfBusca).subscribe({
      next: (resp) => {
        this.buscando = false;
        this.responsavelEncontrado = resp;
        this.responsavelPronto.emit(resp.cpf);
        this.cdr.detectChanges(); // ← força atualização
      },
      error: (err) => {
        console.log('Erro busca:', err.status, err.error);
        this.buscando = false;
        this.responsavelEncontrado = null;

        if (err.status === 404) {
          this.mostrarForm = true;
        } else {
          this.erro = err.error?.detail ?? 'Erro ao buscar responsável.';
        }
        this.cdr.detectChanges(); // ← força atualização
      }
    });
  }

  limpar() {
    this.responsavelEncontrado = null;
    this.mostrarForm = false;
    this.cpfBusca = '';
    this.responsavelPronto.emit('');
    this.cdr.detectChanges();
  }

  cadastrarSeNecessario(): Promise<string> {
    if (this.responsavelEncontrado) {
      return Promise.resolve(this.responsavelEncontrado.cpf);
    }

    const endereco: EnderecoCreate = {
      ...this.novoEndereco,
      numero: Number(this.novoEndereco.numero),
      uf: this.novoEndereco.uf.trim().toUpperCase().slice(0, 2),
      cep: this.novoEndereco.cep.trim().replace(/\D/g, '').slice(0, 8)
    };

    console.log('Endereço enviado:', JSON.stringify(endereco));

    return new Promise((resolve, reject) => {
      this.escolaService.cadastrarEndereco(endereco).subscribe({
        next: (endRes) => {
          const payload: ResponsavelCreate = {
            cpf: this.cpfBusca,
            nome_resp: this.novoResponsavel.nome_resp,
            telefone_resp: this.novoResponsavel.telefone_resp,
            email_resp: this.novoResponsavel.email_resp,
            id_endereco: endRes.id_endereco
          };
          this.escolaService.cadastrarResponsavel(payload).subscribe({
            next: () => resolve(this.cpfBusca),
            error: (err) => reject(err.error?.detail ?? 'Erro ao cadastrar responsável.')
          });
        },
        error: (err) => {
          console.log('Erro endereço:', err.error);
          reject(err.error?.detail ?? 'Erro ao cadastrar endereço.');
        }
      });
    });
  }

  get cpfAtual(): string {
    return this.responsavelEncontrado?.cpf ?? (this.mostrarForm ? this.cpfBusca : '');
  }

  get pronto(): boolean {
    return !!this.responsavelEncontrado || this.mostrarForm;
  }
}