import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf y @for
import { Factura } from '../../../models/factura.model';
import { FacturaService } from '../../../services/factura-service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-facturas',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './lista-facturas.html',
  styleUrl: './lista-facturas.scss',
})
export class ListaFacturas implements OnInit {
  //Agregamos las variables de estado para nuestros datos
    //Signals
    facturas = signal<Factura[]>([]);
    cargando = signal<boolean>(true);
    mensajeError: string | null = null;

    constructor(private facturaService: FacturaService){}

    ngOnInit(): void {
      this.loadFacturas();
    }

    private loadFacturas(){
      this.cargando.set(true);
      this.mensajeError = null;

      this.facturaService.obtenerFacturas().subscribe({
        next:(data) =>{
          this.facturas.set(data);
          this.cargando.set(false);
          console.log('Facturas cargadas:', this.facturas)
        },
        error:(err: HttpErrorResponse) =>{
          console.log("Error al cargar los datos.", err);
          this.mensajeError = `Error al conectar con la API: ${err.message}. Asegúrate que el servidor Node.js esté corriendo.`;
          this.facturas.set([]);
          this.cargando.set(false);
        }
      })
    }

    eliminar(id: number | undefined) {
      if (!id) return;

      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.facturaService.eliminar(id).subscribe({
            next: () => {
              Swal.fire('¡Eliminada!', 'La factura ha sido eliminada.', 'success');
              this.loadFacturas(); // Recargar la lista
            },
            error: (err) => {
              console.error('Error al eliminar factura', err);
              Swal.fire('Error', 'Hubo un problema al eliminar la factura.', 'error');
            }
          });
        }
      });
    }
}
