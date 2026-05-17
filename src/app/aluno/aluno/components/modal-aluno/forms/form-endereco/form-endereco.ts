import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnderecoCreate } from '../../../../../../models/escola.model';

@Component({
  selector: 'app-form-endereco',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-endereco.html'
})
export class FormEnderecoComponent {
  @Input() endereco: EnderecoCreate = {
    rua: '', numero: 0, bairro: '', cidade: '', uf: '', cep: ''
  };
}