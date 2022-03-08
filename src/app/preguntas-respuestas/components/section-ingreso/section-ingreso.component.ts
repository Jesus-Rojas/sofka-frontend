import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from '../../services/api/api-user.service';
import { LogicUserService } from '../../services/logic/logic-user.service';

@Component({
  selector: 'app-section-ingreso',
  templateUrl: './section-ingreso.component.html',
  styleUrls: ['./section-ingreso.component.scss']
})
export class SectionIngresoComponent implements OnInit  {

  nombre = "";

  constructor (private logicUser: LogicUserService) { }

  ngOnInit(): void {
  }

  validarInput(){
    this.nombre = this.nombre.trim();
  }

  startGame(){
    if (this.nombre.length > 0) {
      const datos = {
        nombre: this.nombre.trim().toLowerCase()
      };
      this.logicUser.getDataUser(datos);
    }
  }
}