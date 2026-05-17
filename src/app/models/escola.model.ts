// =============================================
// escola.model.ts — alinhado com o backend FastAPI
// Gerado com base nos schemas.py e endpoints do main.py
// =============================================

// --- RETORNO DOS ENDPOINTS GET ---

export interface Turma {
  id_turma: number;
  nome_turma: string;
  turno: string;
  // ano_letivo NÃO é retornado pelo GET /turmas (removido)
}

// GET /alunos retorna o resultado da sp_ConsultarAluno — campos variáveis conforme SP
// Usar 'any' para não quebrar caso a SP retorne colunas extras
export interface Aluno {
  matricula: number;
  nome_aluno: string;
  telefone_aluno: string;
  email_aluno: string;
  data_nasc: string;
  sexo: string;
  id_turma: number;
  nome_turma?: string; // pode vir da SP com JOIN
}

// GET /relatorios/situacao-geral — retorno da vw_SituacaoAlunos
export interface SituacaoAluno {
  nome_turma: string;
  nome_disciplina: string;
  matricula: number;
  nome_aluno: string;
  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;
  media: number | null;
  situacao: string;
}

// GET /relatorios/aluno/{matricula} — retorno da sp_RelNotasAluno
export interface BoletimAluno {
  nome_aluno: string;
  nome_disciplina: string;
  nota_1: number | null;
  nota_2: number | null;
  nota_3: number | null;
  media: number | null;
  situacao: string;
}

// GET /professores — retorno da sp_ConsultarProfessor
export interface Professor {
  id_professor: number;
  nome_prof: string;
  email_prof: string;
  telefone_prof: string;
  id_endereco?: number;
}

// --- PAYLOADS DE CRIAÇÃO (POST/PUT) ---

// POST /alunos e PUT /alunos/{matricula}
export interface AlunoCreate {
  matricula: number;
  nome_aluno: string;
  telefone_aluno: string;
  email_aluno: string;
  data_nasc: string; // formato: 'YYYY-MM-DD'
  sexo: string;      // 'M' ou 'F'
  id_turma: number;
  cpf_responsavel: string;
}

export interface AlunoUpdate {
  nome_aluno: string;
  telefone_aluno: string;
  email_aluno: string;
  data_nasc: string;
  sexo: string;
  id_turma: number;
}

// POST /notas/lancar
export interface NotaUpdate {
  matricula_aluno: number;
  id_disciplina: number;
  numero_nota: number; // 1, 2 ou 3
  valor_nota: number;  // 0 a 10
}

// POST /enderecos
export interface EnderecoCreate {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export interface EnderecoResponse {
  id_endereco: number;
  message: string;
}

// POST /professores — requer id_endereco de um endereço já cadastrado
export interface ProfessorCreate {
  nome_prof: string;
  email_prof: string;
  telefone_prof: string;
  id_endereco: number;
}

// POST /responsaveis
export interface ResponsavelCreate {
  cpf: string;
  nome_resp: string;
  telefone_resp: string;  // ← era telefone
  email_resp: string;     // ← era email
  id_endereco: number;
}

export interface Responsavel {
  cpf: string;
  nome_resp: string;
}

// POST /disciplinas
export interface DisciplinaCreate {
  nome_disciplina: string;
}

// --- RESPOSTA GENÉRICA DE SUCESSO ---
export interface ApiResponse {
  message: string;
}