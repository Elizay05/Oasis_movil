import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';


@Component({
  selector: 'perfil',
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']

  
})
export class PerfilComponent {
  rol: string;
  nombre: string;
  foto: string;
  perfil;
  userId: number;
  email: string;

  rolNombre: string;

  public constructor(private router: Router, private page: Page,) {
    if (localStorage.getItem('Oasis.token')) {
      this.perfil = JSON.parse(localStorage.getItem('Oasis.user'))
      this.rol = this.perfil.rol
      this.nombre = this.perfil.nombre
      this.foto = global.url+this.perfil.foto
      this.email = this.perfil.email

      this.asignarRol(this.rol);
    }
    else {
      this.rol = ""
      this.nombre = ""
      this.foto = ""
      this.email = ""
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"])}
    

  asignarRol(rol: string) {
    if (rol === '1') {
      this.rolNombre = 'Administrador'
    }
    else if (rol === '2') {
      this.rolNombre = 'Bartender'
    }
    else if (rol === '3') {
      this.rolNombre = 'Mesero'
    }
    else{
      this.rolNombre = 'Cliente'
    }
  }
}