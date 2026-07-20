import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf y @for
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente-service';
import { HttpErrorResponse } from '@angular/common/http'; // Para manejo de errores
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.scss',
})
export class ListaClientesComponent implements OnInit {
  //Agregamos las variables de estado para nuestros datos
  //Signals
  clientes = signal<Cliente[]>([]);
  cargando = signal<boolean>(true);
  mensajeError: string | null = null;

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.loadClientes();
  }

  private loadClientes(){
    this.cargando.set(true);
    this.mensajeError = null;

    this.clienteService.obtenerClientes().subscribe({
      next:(data) =>{
        this.clientes.set(data);
        this.cargando.set(false);
        console.log('Clientes cargados:', this.clientes)
      },
      error:(err: HttpErrorResponse) =>{
        console.log("Error al cargar los datos.", err);
        this.mensajeError = `Error al conectar con la API: ${err.message}. Asegúrate que el servidor Node.js esté corriendo.`;
        this.clientes.set([]);
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
        this.clienteService.eliminar(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');
            this.loadClientes(); // Recargar la lista
          },
          error: (err) => {
            console.error('Error al eliminar cliente', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el cliente.', 'error');
          }
        });
      }
    });
  }
}
