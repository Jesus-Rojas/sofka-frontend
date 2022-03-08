import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  rutaBackground = `url(${environment.img}/assets/img/background.jpg)`;

  constructor (private router: Router) { }

  ngOnInit(): void {
    const local = localStorage.getItem('jugador');
    if (local && local.trim().length > 0) {
      this.router.navigateByUrl('/cuestionario')
    }
  }
}