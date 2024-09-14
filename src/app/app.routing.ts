import { HomeComponent } from "./components/home/home"; 
import { TiendaComponent } from "./components/tienda/tienda";
import { EventoComponent } from "./components/evento/evento";
import { InfoEventoComponent } from "./components/info_evento/info_evento";
import { LoginComponent } from "./components/login/login";
import { PerfilComponent } from "./components/perfil/perfil";
import { QrMesaComponent } from "./components/qr_mesa/qr_mesa";
import { PedidoComponent } from "./components/pedido/pedido";
import { RegistroComponent } from "./components/registro/registro";
import { ProductosComponent } from "./components/productos/productos";
import { ProductosAdminComponent } from "./components/productos_admin/productos_admin";
import { EditarPerfilComponent } from "./components/editar_perfil/editarperfil";
import { EventoEntradasComponent } from "./components/evento_entradas/evento_entradas";
import { NumberInputStepperComponent } from "./components/number-input-stepper/number-input-stepper";
import { ModalEntradasComponent } from "./components/modal-entradas/modal-entradas";
import { PerfilEntradasComponent } from "./components/perfil_entradas/perfil-entradas";
import { PerfilEntradasDetallesComponent } from "./components/perfil-entradas-detalles/perfil-entradas-detalles";
import { ModalQrComponent } from "./components/modal-qr/modal-qr";
import { EventoReservasComponent } from  "./components/evento-reservas/evento-reservas";
import { ModalReservasComponent } from "./components/modal-reservas/modal-reservas";

export const appRoutes: any = [
  { path: '', redirectTo: 'evento', pathMatch: 'full' },
  { path: "home", component: HomeComponent,data:{permission:'1'} },
  { path: "tienda", component: TiendaComponent },
  { path: "evento", component: EventoComponent },
  { path: "evento/info_evento/:id", component: InfoEventoComponent },
  { path: "login", component: LoginComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "qr_mesa", component: QrMesaComponent},
  { path: "pedido", component: PedidoComponent},
  { path: "registro", component: RegistroComponent},
  { path: "editarperfil", component: EditarPerfilComponent},
  { path: "productos_admin", component: ProductosAdminComponent },
  // { path: "noticias", component: NoticiasComponent},
  { path: "productos", component: ProductosComponent},
  { path: "productos_admin", component: ProductosAdminComponent},
  { path: "evento/entradas/:id", component: EventoEntradasComponent},
  { path: "perfil/entradas", component: PerfilEntradasComponent},
  { path: "perfil/entradas/detalles/:id", component: PerfilEntradasDetallesComponent},
  { path: "evento/reservas/:id", component: EventoReservasComponent},
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
  ProductosAdminComponent,
  //NoticiasComponent,
  ProductosComponent,
  ProductosAdminComponent,
  EventoEntradasComponent,
  NumberInputStepperComponent,
  ModalEntradasComponent,
  PerfilEntradasComponent,
  PerfilEntradasDetallesComponent,
  ModalQrComponent,
  EventoReservasComponent,
  ModalReservasComponent
];

