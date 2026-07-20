import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  // En este servicio agregaremos el método para consultar los datos de confirmación
    private apiURL = 'http://localhost:3000' // URL del servidor

    constructor(private http: HttpClient) { }

    // MÉTODO POST: Para registrar una nueva factura (Soluciona el error de "no existe")
    registrarFactura(facturaData: Factura): Observable<any> {
      // La llamada final será a: http://localhost:3000/facturas
      return this.http.post<any>(`${this.apiURL}/facturas`, facturaData);
    }

    // MÉTODO GET: Para obtener todas las facturas
    obtenerFacturas(): Observable<Factura[]> {
      return this.http.get<Factura[]>(`${this.apiURL}/facturas`);
    }

    // MÉTODO GET: Para obtener una factura por id
    obtenerPorId(id: number): Observable<Factura> {
      return this.http.get<Factura>(`${this.apiURL}/facturas/${id}`);
    }

    // MÉTODO PUT: Para actualizar una factura
    actualizar(id: number, facturaData: Factura): Observable<any> {
      return this.http.put<any>(`${this.apiURL}/facturas/${id}`, facturaData);
    }

    // MÉTODO DELETE: Para eliminar una factura
    eliminar(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiURL}/facturas/${id}`);
    }
}
