import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page, TextField } from '@nativescript/core';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls:["./login.css"]
})
export class LoginComponent {
  public constructor(private router: Router, private page: Page) {
    // Use the component constructor to inject providers.
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"])
  }
  public onIniciarSesion(){
    this.router.navigate(["home"])
  }
  public onRegistrarse(){
    this.router.navigate(["registro"])
  }
}