import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page, TextField } from '@nativescript/core';

@Component({
  selector: 'noticias',
  templateUrl: './noticias.html',
  styleUrls: ['./noticias.css'],
})
export class NoticiasComponent {
  public constructor(private router: Router, private page: Page) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  public onTap(){
    this.router.navigate(["home"])
  }
}