import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor, ProfesorID, ProfesorPartial } from '../model/profesor'; // Asegúrate de importar tus modelos


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/profesores';

  constructor(private http: HttpClient) { }

  // Método para inicio de sesión
  iniciarSesion(usuario: string, contraseña: string): Observable<ProfesorID[]> {
    return this.http.get<ProfesorID[]>(`${this.apiUrl}?usuario=${usuario}&contraseña=${contraseña}`);
  }

  obtenerProfesorPorId(id: number): Observable<ProfesorID> {
    return this.http.get<ProfesorID>(`${this.apiUrl}/${id}`);
  }

  actualizarProfesor(profesor: ProfesorID): Observable<ProfesorID> {
    return this.http.put<ProfesorID>(`${this.apiUrl}/${profesor.id}`, profesor);
  }
  // ... otros métodos ...
}