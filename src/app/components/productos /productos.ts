import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { Page, TextField } from '@nativescript/core';
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { Dialogs } from '@nativescript/core'


@Component({
    selector: 'productos',
    templateUrl: './productos.html',

})
export class ProductosComponent implements OnInit {
    productos = [];
    public constructor(private router: Router,private apiService: ApiService,private page: Page) {
        this.obtenerTodos()
        // Use the component constructor to inject providers.
    }
    public obtenerTodos() {
        this.apiService.getProducts().subscribe((data: any[]) => {
            console.log(data)
            this.productos = data
        })
    }
    ngOnInit(): void {
        this.apiService.getProducts().subscribe(data => {
            console.log(data)
        })
    }
}