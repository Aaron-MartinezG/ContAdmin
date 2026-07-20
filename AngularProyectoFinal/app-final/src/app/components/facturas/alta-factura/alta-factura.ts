import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacturaService } from '../../../services/factura-service';
import { ClienteService } from '../../../services/cliente-service';
import { Factura } from '../../../models/factura.model';
import { Cliente } from '../../../models/cliente.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alta-factura.html',
  styleUrl: './alta-factura.scss',
})
export class AltaFactura implements OnInit {
  model: Factura = this.resetModel();
  clientes: Cliente[] = []; // Lista para el dropdown

  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  idActual: number | null = null;

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarClientes();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idActual = Number(id);
        this.cargarFacturaParaEdicion(this.idActual);
      }
    });
  }

  cargarFacturaParaEdicion(id: number) {
    this.facturaService.obtenerPorId(id).subscribe({
      next: (data) => {
        if(data.fecha_emision) {
          data.fecha_emision = new Date(data.fecha_emision).toISOString().substring(0, 10);
        }
        if(data.fecha_pago) {
          data.fecha_pago = new Date(data.fecha_pago).toISOString().substring(0, 10);
        }
        this.model = data;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar la factura para editar', 'error');
        this.router.navigate(['/listaFacturas']);
      }
    });
  }

  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        // NOTA: Si el backend no devuelve id, se debe modificar el modelo Cliente
      }
    });
  }

  resetModel(): Factura {
    const today = new Date().toISOString().substring(0, 10);
    return {
      id_cliente: 0,
      folio: '',
      fecha_emision: today,
      fecha_pago: '',
      monto: 0,
      estado: 'Pendiente'
    };
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.mensajeError = 'Formulario inválido. Verifica los campos obligatorios.';
      return;
    }

    this.model.id_cliente = Number(this.model.id_cliente);

    if (this.idActual) {
      // MODO EDICIÓN
      this.facturaService.actualizar(this.idActual, this.model).subscribe({
        next: () => {
          Swal.fire('¡Actualizada!', 'La factura se actualizó correctamente.', 'success');
          this.router.navigate(['/listaFacturas']);
        },
        error: (err) => {
          this.mensajeError = `Error al actualizar: ${err.error?.message || err.message}`;
        }
      });
    } else {
      // MODO CREACIÓN
      this.facturaService.registrarFactura(this.model).subscribe({
        next: (res) => {
          Swal.fire('¡Registrada!', 'Factura registrada con éxito.', 'success');
          this.router.navigate(['/listaFacturas']);
        },
        error: (err: HttpErrorResponse) => {
          this.mensajeError = `Error al registrar: ${err.error?.message || err.message}`;
        }
      });
    }
  }
}
