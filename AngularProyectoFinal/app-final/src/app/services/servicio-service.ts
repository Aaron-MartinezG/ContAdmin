import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  // En este servicio agregaremos el método para consultar los datos de confirmación
  private apiURL = 'http://localhost:3000' // URL del servidor

  constructor(private http: HttpClient) { }


  registrarServicio(servicioData: Servicio): Observable<any> {
    // La llamada final será a: http://localhost:3000/servicios
    return this.http.post<any>(`${this.apiURL}/servicios`, servicioData);
  }

  // MÉTODO GET: Para obtener todos los servicios
  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiURL}/servicios`);
  }

  // MÉTODO GET: Para obtener un servicio por id
  obtenerPorId(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiURL}/servicios/${id}`);
  }

  // MÉTODO PUT: Para actualizar un servicio
  actualizar(id: number, servicioData: Servicio): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/servicios/${id}`, servicioData);
  }

  // MÉTODO DELETE: Para eliminar un servicio
  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/servicios/${id}`);
  }
}
