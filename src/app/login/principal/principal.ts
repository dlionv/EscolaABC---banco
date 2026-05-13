import { Component } from '@angular/core';
import { ModalLogin } from "../components/modal-login/modal-login";

@Component({
  selector: 'app-principal',
  imports: [ModalLogin],
  standalone: true,
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {}
