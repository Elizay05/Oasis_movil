import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { exit } from "nativescript-exit";
import { Page, TextField } from '@nativescript/core';
import { openUrl } from '@nativescript/core/utils';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  public constructor(private router: Router, private page: Page) {
    
    console.log("home")
    console.info("Averiguando si hay datos...");
    if (localStorage.getItem('Oasis.token')){
        console.log("Bienvenido "+JSON.parse( localStorage.getItem('Oasis.user')).nombre+"!!");
    }
    else{
        this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  public onExit(): void {
    exit(); // will close application
  }

  onReserva() {
    this.router.navigate(['evento'])
  }
  onQrMesa(){
    this.router.navigate(['qr_mesa'])
  }
  onProductos(){
    const state = { returnToHome: true };
    this.router.navigate(['productos'], { state });
  }
  mostrarMapa(){
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
  public cerrarSesion(private router: Router){
    console.log("Eliminar sesión...")
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

