import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class CardComponent {
  totalRelatorio = input<number>(0);
  label = input<string>('');
  titulo = input<string>('');
  rota = input<string>('');
}
