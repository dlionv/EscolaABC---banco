import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Professor } from '../models/escola.model';
import { EscolaService } from '../services/escola.service';
import { ModalProfessorComponent } from "./components/modal-professor/modal-professor";

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, ModalProfessorComponent],
  templateUrl: './professor.html',
  styleUrl: './professor.css'
})
export class ProfessorComponent implements OnInit {
  professores: Professor[] = [];
  modalAberto = false;

  constructor(private escolaService: EscolaService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.carregarProfessores();
  }

  carregarProfessores() {
    this.escolaService.getProfessores().subscribe({
      next: (data) => {
        this.professores = [...data];
        this.cdr.detectChanges();
      },
      error: () => this.professores = []
    });
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  onSalvo() {
    this.carregarProfessores();
    this.fecharModal();
  }

  excluir(id: number) {
    if (!confirm('Deseja excluir este professor?')) return;
    alert('Função de exclusão não implementada no backend ainda.');
  }
}