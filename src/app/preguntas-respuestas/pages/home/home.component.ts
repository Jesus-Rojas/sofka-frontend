import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  rutaBackground = `url(/assets/img/background.jpg)`;

  constructor (private router: Router) { }

  ngOnInit(): void {
    const local = localStorage.getItem('jugador');
    if (local && local.trim().length > 0) {
      this.router.navigateByUrl('/cuestionario')
    }
  }
}