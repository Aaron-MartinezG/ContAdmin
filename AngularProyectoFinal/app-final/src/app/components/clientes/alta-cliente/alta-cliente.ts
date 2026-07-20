import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente-service';
import { ServicioService } from '../../../services/servicio-service';
import { Cliente } from '../../../models/cliente.model';
import { Servicio } from '../../../models/servicio.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// La interfaz ClienteModel es un alias de Cliente
type ClienteModel = Cliente;

@Component({
  selector: 'app-alta-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alta-cliente.html',
  styleUrl: './alta-cliente.scss'
})
export class AltaClienteComponent implements OnInit {
  model: ClienteModel = this.resetModel();

  // Ahora tipamos la lista como Servicio[] y la dejamos vacía
  servicios: Servicio[] = [];

  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  idActual: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarServicios();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idActual = Number(id);
        this.cargarClienteParaEdicion(this.idActual);
      }
    });
  }

  cargarClienteParaEdicion(id: number) {
    this.clienteService.obtenerPorId(id).subscribe({
      next: (data) => {
        // Formatear la fecha para que el input type="date" la acepte (YYYY-MM-DD)
        if(data.fecha_inicio) {
          data.fecha_inicio = new Date(data.fecha_inicio).toISOString().substring(0, 10);
        }
        this.model = data;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar el cliente para editar', 'error');
        this.router.navigate(['/listaClientes']);
      }
    });
  }

  /**
   * Obtiene la lista real de servicios desde el API
   */
  private cargarServicios(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (data: Servicio[]) => {
        // Asigna los servicios reales obtenidos del backend
        this.servicios = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error cargando servicios:', err);
        this.mensajeError = 'No se pudo cargar el catálogo de servicios desde la API.';
      }
    });
  }

  resetModel(): ClienteModel {
    const today = new Date().toISOString().substring(0, 10);
    return {
      nombre: '',
      empresa: '',
      correo: '',
      telefono: '',
      rfc: '',
      honorarios_mensuales: 0,
      fecha_inicio: today,
      activo: true,
      id_servicio: 0
    } as ClienteModel;
  }

  onSubmit(form: NgForm): void {
    // ... (Tu lógica de envío POST) ...
    this.mensajeExito = null;
    this.mensajeError = null;

    if (form.invalid) {
      this.mensajeError = 'Por favor, corrige los errores en los campos obligatorios.';
      return;
    }

    const clienteGuardar: Cliente = this.model;

    if (this.idActual) {
      // MODO EDICIÓN
      this.clienteService.actualizar(this.idActual, clienteGuardar).subscribe({
        next: () => {
          Swal.fire('¡Actualizado!', 'El cliente se actualizó correctamente.', 'success');
          this.router.navigate(['/listaClientes']);
        },
        error: (err) => {
          this.mensajeError = `Error al actualizar: ${err.error?.message || err.message}`;
        }
      });
    } else {
      // MODO CREACIÓN
      this.clienteService.registrarCliente(clienteGuardar).subscribe({
        next: (response: any) => {
          Swal.fire('¡Registrado!', `Cliente ${clienteGuardar.nombre} registrado con éxito.`, 'success');
          this.router.navigate(['/listaClientes']);
        },
        error: (err: HttpErrorResponse) => {
          this.mensajeError = `Error al registrar: ${err.error?.message || 'Verifica el servidor.'}`;
        }
      });
    }
  }
}
