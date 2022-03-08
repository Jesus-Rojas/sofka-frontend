import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Intento, Respuesta } from '../../interfaces/cuestionario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiPreguntaService {

  url = environment.api;

  constructor(private http: HttpClient) { }

  validarIntento(datos:LogicDatosUser) :Observable<Intento> {
    return this.http.post<Intento>(`${this.url}/intento`, datos)
  }

  respuesta(datos:LogicDatosRespuesta) :Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.url}/respuesta`, datos)
  }

  salir(datos:LogicDatosSalir) :Observable<any> {
    return this.http.post<any>(`${this.url}/salir`, datos)
  }
}

interface LogicDatosUser {
  nombre: string;
}

interface LogicDatosRespuesta {
  id: number;
  respuesta_id: number;
}

interface LogicDatosSalir {
  id: number;
}