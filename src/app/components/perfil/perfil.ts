import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Dialogs, Page, TextField } from '@nativescript/core';


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
  email: string = '';
  public constructor(private router: Router, private page: Page,) {
    // Use the component constructor to inject providers.
    if (localStorage.getItem('Oasis.token')) {
      this.perfil = JSON.parse(localStorage.getItem('Oasis.user'))
      console.log("Bienvenido " + this.perfil.nombre + "!!");
      this.rol = this.perfil.rol
      this.nombre = this.perfil.nombre
      this.foto = global.url+this.perfil.foto
      this.email = this.perfil.email
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
    
}