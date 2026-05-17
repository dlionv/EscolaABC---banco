import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from "../components/header/header";
import { Corpo } from "../components/corpo/corpo";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Corpo],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {

  
}