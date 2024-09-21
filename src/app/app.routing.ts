import { HomeComponent } from "./components/home/home"; 
import { TiendaComponent } from "./components/tienda/tienda";
import { EventoComponent } from "./components/evento/evento";
import { InfoEventoComponent } from "./components/info_evento/info_evento";
import { LoginComponent } from "./components/login/login";
import { PerfilComponent } from "./components/perfil/perfil";
import { QrMesaComponent } from "./components/qr_mesa/qr_mesa";
import { PedidoComponent } from "./components/pedido/pedido";
import { RegistroComponent } from "./components/registro/registro";
import { EditarPerfilComponent } from "./components/editar_perfil/editarperfil";
import { EventoEntradasComponent } from "./components/evento_entradas/evento_entradas";
import { NumberInputStepperComponent } from "./components/number-input-stepper/number-input-stepper";
import { ModalEntradasComponent } from "./components/modal-entradas/modal-entradas";
import { PerfilEntradasComponent } from "./components/perfil_entradas/perfil-entradas";
import { PerfilEntradasDetallesComponent } from "./components/perfil-entradas-detalles/perfil-entradas-detalles";
import { ModalQrComponent } from "./components/modal-qr/modal-qr";
import { EventoReservasComponent } from  "./components/evento-reservas/evento-reservas";
import { ModalReservasComponent } from "./components/modal-reservas/modal-reservas";
import { PerfilReservasComponent } from "./components/perfil-reservas/perfil-reservas";
import { PerfilReservasDetallesComponent } from "./components/perfil-reservas-detalles/perfil-reservas-detalles";
import { ModalPedidosComponent } from "./components/modal-pedidos/modal-pedidos";
import { PerfilPedidosDetallesComponent } from "./components/perfil-pedidos-detalles/perfil-pedidos-detalles";
import { ModalEliminarPedidoComponent } from "./components/modal-eliminar-pedido/modal-eliminar-pedido";
import { ModalMotivoEliminacionComponent } from "./components/modal-motivo-eliminacion/modal-motivo-eliminacion";
import { GestionMesasComponent } from "./components/gestion-mesas/gestion-mesas";
import { GestionMesasDetallesComponent } from "./components/gestion-mesas-detalles/gestion-mesas-detalles";
import { PerfilMesasCargoComponent } from "./components/perfil-mesas-cargo/perfil-mesas-cargo";
import { PerfilMesasCargoDetallesComponent } from "./components/perfil-mesas-cargo-detalles/perfil-mesas-cargo-detalles";
import { ModalReservaEscaneadoComponent } from "./components/modal-reserva-escaneado/modal-reserva-escaneado";
import { ModalEntradaEscaneadoComponent } from "./components/modal-entrada-escaneado/modal-entrada-escaneado";
import { CategoriaProductosComponent } from "./components/categoria-productos/categoria-productos";
import { ProductosComponent } from "./components/productos/productos"
import { ModalProductosComponent } from "./components/modal-productos/modal-productos"


export const appRoutes: any = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent,data:{permission:'1'} },
  { path: "tienda", component: TiendaComponent },
  { path: "evento", component: EventoComponent },
  { path: "evento/info_evento/:id", component: InfoEventoComponent },
  { path: "login", component: LoginComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "qr_mesa", component: QrMesaComponent},
  { path: "pedido/:id/:mesa", component: PedidoComponent},
  { path: "registro", component: RegistroComponent},
  { path: "editarperfil", component: EditarPerfilComponent},
  // { path: "noticias", component: NoticiasComponent},
  { path: "evento/entradas/:id", component: EventoEntradasComponent},
  { path: "perfil/entradas", component: PerfilEntradasComponent},
  { path: "perfil/entradas/detalles/:id", component: PerfilEntradasDetallesComponent},
  { path: "evento/reservas/:id", component: EventoReservasComponent},
  { path: "perfil/reservas", component: PerfilReservasComponent},
  { path: "perfil/reservas/detalles/:id", component: PerfilReservasDetallesComponent},
  { path: "perfil/pedidos", component: PerfilPedidosDetallesComponent},
  { path: "gestionMesas", component: GestionMesasComponent},
  { path: "gestionMesas/detalles/:id", component: GestionMesasDetallesComponent},
  { path: "perfil/mesasCargo", component: PerfilMesasCargoComponent},
  { path: "perfil/mesasCargo/detalles/:id", component: PerfilMesasCargoDetallesComponent},
  { path: "categoria/:id", component: CategoriaProductosComponent},
  { path: "productos", component: ProductosComponent }
];

export const appComponents: any = [
  HomeComponent,
  TiendaComponent,
  EventoComponent,
  InfoEventoComponent,
  LoginComponent,
  PerfilComponent,
  QrMesaComponent,
  PedidoComponent,
  RegistroComponent,
  EditarPerfilComponent,
  //NoticiasComponent,
  EventoEntradasComponent,
  NumberInputStepperComponent,
  ModalEntradasComponent,
  PerfilEntradasComponent,
  PerfilEntradasDetallesComponent,
  ModalQrComponent,
  EventoReservasComponent,
  ModalReservasComponent,
  PerfilReservasComponent,
  PerfilReservasDetallesComponent,
  ModalPedidosComponent,
  PerfilPedidosDetallesComponent,
  ModalEliminarPedidoComponent,
  ModalMotivoEliminacionComponent,
  GestionMesasComponent,
  GestionMesasDetallesComponent,
  PerfilMesasCargoComponent,
  PerfilMesasCargoDetallesComponent,
  ModalReservaEscaneadoComponent,
  ModalEntradaEscaneadoComponent,
  CategoriaProductosComponent,
  ProductosComponent,
  ModalProductosComponent
];

