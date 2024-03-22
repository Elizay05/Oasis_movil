import { HomeComponent } from "./components/home/home"; 
import { TiendaComponent } from "./components/tienda/tienda";
import { EventoComponent } from "./components/evento/evento";
import { InfoEventoComponent } from "./components/info_evento/info_evento";
import { EventoCarritoComponent } from "./components/evento_agregar_carrito/evento_carrito";
import { LoginComponent } from "./components/login/login";
import { PerfilComponent } from "./components/perfil/perfil";
import { QrMesaComponent } from "./components/qr_mesa/qr_mesa";
import { PedidoComponent } from "./components/pedido/pedido";
import { RegistroComponent } from "./components/registro/registro";


export const appRoutes: any = [
  { path: '', redirectTo: 'perfil', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "tienda", component: TiendaComponent },
  { path: "evento", component: EventoComponent },
  { path: "evento/info_evento/:id", component: InfoEventoComponent },
  { path: "evento_carrito", component: EventoCarritoComponent },
  { path: "login", component: LoginComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "qr_mesa", component: QrMesaComponent},
  { path: "pedido", component: PedidoComponent},
  { path: "registro", component: RegistroComponent},
];

export const appComponents: any = [
  HomeComponent,
  TiendaComponent,
  EventoComponent,
  InfoEventoComponent,
  EventoCarritoComponent,
  LoginComponent,
  PerfilComponent,
  QrMesaComponent,
  PedidoComponent,
  RegistroComponent,
];
