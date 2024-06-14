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
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"])}
    
}