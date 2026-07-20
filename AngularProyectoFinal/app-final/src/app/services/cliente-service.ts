import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  // En este servicio agregaremos el método para consultar los datos de confirmación
  private apiURL = 'http://localhost:3000' // URL del servidor

  constructor(private http: HttpClient) { }

  // MÉTODO POST: Para registrar un nuevo cliente (Soluciona el error de "no existe")
  registrarCliente(clienteData: Cliente): Observable<any> {
    // La llamada final será a: http://localhost:3000/clientes
    return this.http.post<any>(`${this.apiURL}/clientes`, clienteData);
  }

  // MÉTODO GET: Para obtener todos los clientes
  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiURL}/clientes`);
  }

  // MÉTODO GET: Para obtener un cliente por id
  obtenerPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/clientes/${id}`);
  }

  // MÉTODO PUT: Para actualizar un cliente
  actualizar(id: number, clienteData: Cliente): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/clientes/${id}`, clienteData);
  }

  // MÉTODO DELETE: Para eliminar un cliente
  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/clientes/${id}`);
  }
}
