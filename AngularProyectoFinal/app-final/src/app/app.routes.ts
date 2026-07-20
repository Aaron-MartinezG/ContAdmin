import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes';
import { AltaClienteComponent } from './components/clientes/alta-cliente/alta-cliente';
import { ListaFacturas } from './components/facturas/lista-facturas/lista-facturas';
import { AltaFactura } from './components/facturas/alta-factura/alta-factura';
import { ListaServicios } from './components/servicios/lista-servicios/lista-servicios';
import { AltaServicio } from './components/servicios/alta-servicio/alta-servicio';

import { LoginComponent } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path:'login', component: LoginComponent },

  {path: 'inicio', component: InicioComponent},
  { path:'listaClientes', component: ListaClientesComponent},
  { path: 'altaClientes', component: AltaClienteComponent},

  { path: 'listaFacturas', component: ListaFacturas},
  { path: 'altaFacturas', component: AltaFactura},

  {path: 'listaServicios', component: ListaServicios},
  {path: 'altaServicios', component: AltaServicio},

  // Rutas para edición reutilizando los componentes de alta
  { path: 'editarCliente/:id', component: AltaClienteComponent },
  { path: 'editarFactura/:id', component: AltaFactura },
  { path: 'editarServicio/:id', component: AltaServicio },

  { path: '**', redirectTo: 'login' }
];
