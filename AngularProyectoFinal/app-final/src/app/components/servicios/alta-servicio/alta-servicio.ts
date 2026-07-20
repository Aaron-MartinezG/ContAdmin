import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../../services/servicio-service';
import { Servicio } from '../../../models/servicio.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alta-servicio.html',
  styleUrl: './alta-servicio.scss',
})
export class AltaServicio implements OnInit {

  model: Servicio = this.resetModel();
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  idActual: number | null = null;

  constructor(
    private servicioService: ServicioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idActual = Number(id);
        this.cargarServicioParaEdicion(this.idActual);
      }
    });
  }

  cargarServicioParaEdicion(id: number) {
    this.servicioService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.model = data;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar el servicio para editar', 'error');
        this.router.navigate(['/listaServicios']);
      }
    });
  }

  resetModel(): Servicio {
    return {
      nombre: '',
      descripcion: '',
      precio_base: 0
    };
  }

  onSubmit(form: NgForm): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    if (form.invalid) {
      this.mensajeError = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    const nuevoServicio: Servicio = this.model;

    if (this.idActual) {
      // MODO EDICIÓN
      this.servicioService.actualizar(this.idActual, nuevoServicio).subscribe({
        next: () => {
          Swal.fire('¡Actualizado!', 'El servicio se actualizó correctamente.', 'success');
          this.router.navigate(['/listaServicios']);
        },
        error: (err) => {
          this.mensajeError = `Error al actualizar: ${err.error?.message || err.message}`;
        }
      });
    } else {
      // MODO CREACIÓN
      this.servicioService.registrarServicio(nuevoServicio).subscribe({
        next: (response: any) => {
          Swal.fire('¡Registrado!', `Servicio '${nuevoServicio.nombre}' registrado con éxito.`, 'success');
          this.router.navigate(['/listaServicios']);
        },
        error: (err: HttpErrorResponse) => {
          this.mensajeError = `Error al registrar: ${err.error?.message || err.message}`;
        }
      });
    }
  }
}
