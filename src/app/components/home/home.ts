import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router";
import { exit } from "nativescript-exit";
import { Dialogs, Page, TextField } from '@nativescript/core';
import { openUrl } from '@nativescript/core/utils';
import { ApiService } from '../login/api.service';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  rol: string;
  nombre: string;
  foto: string;
  perfil;
  userId: number;
  email: string = '';
  loggedIn: boolean = false;
  
  public constructor(private router: Router, private page: Page, private activatedRoute: ActivatedRoute, private apiService: ApiService) {

    console.log("home")
    console.info("Averiguando si hay datos...");
    if (localStorage.getItem('Oasis.token')) {
      this.loggedIn = true;
      this.perfil = JSON.parse(localStorage.getItem('Oasis.user'))
      console.log("Bienvenido " + this.perfil.nombre + "!!");
      this.rol = this.perfil.rol
      this.nombre = this.perfil.nombre
      this.foto = global.url+this.perfil.foto
    }
    else {
      this.rol = ""
      this.nombre = ""
      this.foto = ""
      this.router.navigate(['login']);
    }
    

  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.obtenerFotoUsuario
  }

  public onExit(): void {
    exit(); // will close application
  }

  onReserva() {
    this.router.navigate(['evento'])
  }
  onQrMesa() {
    this.router.navigate(['qr_mesa'])
  }
  onProductos() {
    const state = { returnToHome: true };
    this.router.navigate(['productos'], { state });
  }
  mostrarMapa() {
    openUrl('https://www.google.com/maps/place/SENA+Complejo+Sur+Itag%C3%BC%C3%AD/@6.1809892,-75.6059929,15z/data=!4m6!3m5!1s0x8e46823b07fa76e7:0xd858c9c2ddf4b118!8m2!3d6.1809892!4d-75.6059929!16s%2Fg%2F1hc2vps2d?entry=ttu');// pueden cambiar el sitio yo lo puse en la ubicacion del sena pero pueden moverlo a otra parte si quieren que cuando lo habren les abre el google maps a la ubicacion que se puso aqui
  }
  categorias = ["Cocteles", "Licores", "Comidas", "Aperitivos"];
  todosItems = [
    { nombre: "Flower Power", categoria: "Cocteles", imagen: "~/app/images/coctel1.png" },
    { nombre: "Lemon Coctel", categoria: "Cocteles", imagen: "~/app/images/coctel2.jpg" },
    { nombre: "Sky Blue", categoria: "Cocteles", imagen: "~/app/images/coctel3.jpg" },
    { nombre: "Vodka", categoria: "Licores" },
    { nombre: "Pizza", categoria: "Comidas" },
    { nombre: "Patatas bravas", categoria: "Aperitivos" },
    { nombre: "Flower Power", categoria: "Coteles" },
    // Agrega más elementos según sea necesario
  ];

  itemsFiltrados = this.todosItems; // Inicialmente muestra todos los elementos

  filtrarCategoria(categoria: string) {
    console.log('Categoría seleccionada:', categoria);
    if (categoria === "Todos") {
      this.itemsFiltrados = this.todosItems;
    } else {
      this.itemsFiltrados = this.todosItems.filter(item => item.categoria === categoria);
    }
  }
  public cerrarSesion() {
    console.log("Eliminar sesión...")
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public verificarPermisos(rol) {
    return rol == this.rol;
  }

 
  onimage(): void {
    // Obtener el ID del usuario del almacenamiento local
    this.userId = parseInt(localStorage.getItem('userId'));
    if (!this.userId || isNaN(this.userId)) {
      console.error('ID de usuario no válido:', this.userId);
      return;
    }

    // Obtener la URL de la imagen del usuario actual
    this.apiService.obtenerUrlImage(this.userId).subscribe(
      (data: any) => {
        this.foto = data.url_imagen; // Asigna la URL de la imagen a la variable 'foto'
      },
      error => {
        console.error('Error al obtener la URL de la imagen:', error);
      }
    );
  }
  obtenerFotoUsuario(): void {
    const userId = 1; // Cambia esto según tu lógica para obtener el ID del usuario
    this.apiService.obtenerFotoUsuario(userId).subscribe(
      (url: string) => {
        this.foto = url;
      },
      error => {
        console.error('Error al obtener la URL de la imagen:', error);
      }
    );
  }

}
