import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogicUserService } from '../../services/logic/logic-user.service';
import { ApiPreguntaService } from '../../services/api/api-pregunta.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Opciones } from '../../interfaces/cuestionario.interface';

declare const alertify:any;

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.scss']
})
export class CuestionarioComponent implements OnInit, OnDestroy {
  
  usuario = this.logicUser.usuario;
  jugadorSubscription!: Subscription;
  ronda!:number;
  preguntas!:string;
  respuestas:Opciones[] = [];
  dificultad = '';
  jugador!:string;
  idLogica!:number;
  disabledExit = false;

  constructor ( private logicUser: LogicUserService, private apiPregunta: ApiPreguntaService, private router: Router ) { }

  ngOnInit(): void {
    const local = localStorage.getItem('jugador');
    if (local && local.trim().length > 0) {
      this.jugador = local;
      this.logicUser.getDataUserLogin();
    } else {
      localStorage.clear();
      this.router.navigateByUrl('/home');
    }
    this.jugadorSubscription = this.usuario.subscribe( (nombre) => {
      this.jugador = nombre;
      this.existeIntento()
    });
  }

  existeIntento(){
    const datos = {
      nombre: this.jugador.trim().toLowerCase(),
    };
    this.apiPregunta.validarIntento(datos).subscribe( ({ id, rondas, preguntas }) => {
      this.idLogica = id;
      this.preguntas = preguntas.nombre;
      this.respuestas = preguntas.opciones.map( (data) => {
        data.disabled = false;
        return data
      });
      this.dificultad = rondas.nombre
      this.ronda = rondas.id
    });
  }

  answer(respuesta_id:number){
    this.respuestas = this.respuestas.map( data => {
      data.disabled = true;
      return data
    })
    this.disabledExit = true;
    const datos = {
      id: this.idLogica,
      respuesta_id,
    };
    this.apiPregunta.respuesta(datos).subscribe( ({ res, termino, pregunta }) => {
      if (termino) {
        if (res) {
          // no existen mas rondas mensaje success, limpiar localStorage y redirigir a /home
          alertify.success(`Felicitaciones terminaste todo el cuestionario. Verifica el ranking de puntos.`)
          localStorage.clear();
          this.router.navigateByUrl('/home');
        } else {
          // respuesta incorrecta mensaje danger, limpiar localStorage y redirigir a /home
          alertify.error(`Mas suerte para la proxima.`)
          localStorage.clear();
          this.router.navigateByUrl('/home');
        }
      } else {
        // siguiente ronda
        const { id, rondas, preguntas } = pregunta!;
        this.idLogica = id;
        this.preguntas = preguntas.nombre;
        this.respuestas = preguntas.opciones.map( (data:any) => {
          data.disabled = false;
          return data
        });
        this.dificultad = rondas.nombre;
        this.ronda = rondas.id;
        this.disabledExit = false;
        alertify.success(`Felicitaciones, ganaste 10 puntos. Pasaste a la ronda ${rondas.id}`)
      }
    })
  }

  salir(){
    this.respuestas = this.respuestas.map( data => {
      data.disabled = true;
      return data
    })
    this.disabledExit = true;
    const datos = {
      id: this.idLogica,
      idPregunta: this.respuestas[0].preguntas_id,
    }
    this.apiPregunta.salir(datos).subscribe( (e) => {
      alertify.success(`Quedaste en la ronda ${this.ronda}, su puntuacion es de ${this.ronda == 1 ? '' : this.ronda-1 }0. Verifica el ranking de puntos`)
      localStorage.clear();
      this.router.navigateByUrl('/home');
    });
  }

  ngOnDestroy(): void {
    this.jugadorSubscription.unsubscribe();
  }
}