import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario, DatosUsuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  url = environment.api;

  constructor(private http: HttpClient) { }

  getData(datos: DatosUsuario) :Observable<Usuario>  {
    return this.http.post<Usuario>(`${this.url}/jugador`, datos)
  }
}