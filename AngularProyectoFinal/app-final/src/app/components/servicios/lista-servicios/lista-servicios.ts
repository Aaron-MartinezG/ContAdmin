import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf y @for
import { Servicio } from '../../../models/servicio.model';
import { ServicioService } from '../../../services/servicio-service';
import { HttpErrorResponse } from '@angular/common/http'; // Para manejo de errores
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-servicios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-servicios.html',
  styleUrl: './lista-servicios.scss',
})
export class ListaServicios implements OnInit {
  servicios = signal<Servicio[]>([]); // Signal para los servicios
  cargando = signal<boolean>(true);
  mensajeError: string | null = null;

  constructor(private servicioService: ServicioService) { }

  ngOnInit(): void {
    this.loadServicios();
  }

  private loadServicios() {
    this.cargando.set(true);
    this.mensajeError = null;

    // Llama al método GET del servicio de servicios
    this.servicioService.obtenerServicios().subscribe({
      next: (data: Servicio[]) => {
        this.servicios.set(data);
        this.cargando.set(false);
        console.log('Servicios cargados:', this.servicios());
      },
      error: (err: HttpErrorResponse) => {
        console.error("Error al cargar los datos.", err);
        this.mensajeError = `Error al conectar con la API: ${err.message}. Asegúrate que el servidor Node.js esté corriendo.`;
        this.servicios.set([]);
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
        this.servicioService.eliminar(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El servicio ha sido eliminado.', 'success');
            this.loadServicios(); // Recargar la lista
          },
          error: (err) => {
            console.error('Error al eliminar servicio', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el servicio.', 'error');
          }
        });
      }
    });
  }
}
