import { Component, OnInit } from '@angular/core';
import { ApiHistorialService } from '../../services/api/api-historial.service';
import { Jugadores } from '../../interfaces/historial.interface';

@Component({
  selector: 'app-section-historial',
  templateUrl: './section-historial.component.html',
  styleUrls: ['./section-historial.component.scss']
})
export class SectionHistorialComponent implements OnInit {

  jugadores !: Jugadores[];
  constructor( private apiHistorial: ApiHistorialService ) { }

  ngOnInit(): void {
    this.apiHistorial.historial().subscribe( data => {
      this.jugadores = data;
    })
  }
}