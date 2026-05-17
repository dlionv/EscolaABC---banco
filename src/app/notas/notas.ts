import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notas.html',
  styleUrls: ['./notas.css']
})
export class Notas {

}