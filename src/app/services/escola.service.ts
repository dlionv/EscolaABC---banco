import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Aluno,
  AlunoCreate,
  ApiResponse,
  BoletimAluno,
  DisciplinaCreate,
  EnderecoCreate,
  NotaUpdate,
  Professor,
  ProfessorCreate,
  ResponsavelCreate,
  SituacaoAluno,
  Turma,
} from '../models/escola.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // -------------------------------------------------------
  // TURMAS — GET /turmas
  // Retorna: id_turma, nome_turma, turno
  // -------------------------------------------------------
  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.api}/turmas`);
  }

  // -------------------------------------------------------
  // ALUNOS
  // -------------------------------------------------------

  // GET /alunos?matricula=X (matricula é opcional)
  getAlunos(matricula?: number): Observable<Aluno[]> {
    let params = new HttpParams();
    if (matricula !== undefined) {
      params = params.set('matricula', matricula.toString());
    }
    return this.http.get<Aluno[]>(`${this.api}/alunos`, { params });
  }

  // POST /alunos
  cadastrarAluno(aluno: AlunoCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/alunos`, aluno);
  }

  // PUT /alunos/{matricula}
  atualizarAluno(matricula: number, aluno: AlunoCreate): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.api}/alunos/${matricula}`, aluno);
  }

  // DELETE /alunos/{matricula}
  excluirAluno(matricula: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.api}/alunos/${matricula}`);
  }

  // -------------------------------------------------------
  // PROFESSORES
  // -------------------------------------------------------

  // GET /professores?id=X (id é opcional)
  getProfessores(id?: number): Observable<Professor[]> {
    let params = new HttpParams();
    if (id !== undefined) {
      params = params.set('id', id.toString());
    }
    return this.http.get<Professor[]>(`${this.api}/professores`, { params });
  }

  // POST /professores — atenção: requer id_endereco já existente
  cadastrarProfessor(prof: ProfessorCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/professores`, prof);
  }

  // -------------------------------------------------------
  // DISCIPLINAS
  // Não existe GET /disciplinas no backend — só POST
  // O dashboard não pode exibir contagem de disciplinas via API
  // -------------------------------------------------------

  // POST /disciplinas
  cadastrarDisciplina(disc: DisciplinaCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/disciplinas`, disc);
  }

  // -------------------------------------------------------
  // NOTAS
  // -------------------------------------------------------

  // POST /notas/lancar
  lancarNota(nota: NotaUpdate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/notas/lancar`, nota);
  }

  // -------------------------------------------------------
  // RELATÓRIOS
  // -------------------------------------------------------

  // GET /relatorios/aluno/{matricula}
  getBoletimAluno(matricula: number): Observable<BoletimAluno[]> {
    return this.http.get<BoletimAluno[]>(`${this.api}/relatorios/aluno/${matricula}`);
  }

  // GET /relatorios/situacao-geral
  // Nota: o backend NÃO filtra por nome_turma — retorna todos os alunos
  // O filtro deve ser feito no front após receber os dados
  getSituacaoGeral(): Observable<SituacaoAluno[]> {
    return this.http.get<SituacaoAluno[]>(`${this.api}/relatorios/situacao-geral`);
  }

  // -------------------------------------------------------
  // ENDEREÇOS — necessário antes de cadastrar professor/responsável
  // -------------------------------------------------------

  // POST /enderecos
  cadastrarEndereco(end: EnderecoCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/enderecos`, end);
  }

  // -------------------------------------------------------
  // RESPONSÁVEIS
  // -------------------------------------------------------

  // POST /responsaveis
  cadastrarResponsavel(resp: ResponsavelCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.api}/responsaveis`, resp);
  }
}