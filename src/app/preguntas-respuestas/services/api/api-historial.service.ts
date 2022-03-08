import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jugadores } from '../../interfaces/historial.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiHistorialService {

  url = environment.api;

  constructor(private http: HttpClient) { }

  historial() :Observable<Jugadores[]> {
    return this.http.get<Jugadores[]>(`${this.url}/historial`)
  }
}