<<<<<<< HEAD
import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { BarcodeScanner } from '@nstudio/nativescript-barcodescanner';


=======
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from './api.service';
import { Page, TextField } from '@nativescript/core';
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { Dialogs } from '@nativescript/core';
>>>>>>> origin/Deivy

@Component({
    selector: 'productos',
    templateUrl: './productos.html',
<<<<<<< HEAD
    styleUrls: ['./productos.css'],
})
export class ProductosComponent implements OnInit {

    public constructor(private router: Router, private barcodeScanner: BarcodeScanner) {
        // Use the component constructor to inject providers.
    }
    ngOnInit(): void {

    }

=======
})
export class ProductosComponent implements OnInit {
    productos = [];
    carrito: any[] = [];
    productosAgregados: any[] = [];
    mostrarCarrito: boolean = false; // Corrección: asignar directamente el valor false

    constructor(private router: Router, private apiService: ApiService, private page: Page) {
        this.obtenerTodos();
    }

    obtenerTodos() {
        this.apiService.getProducts().subscribe((data: any[]) => {
            console.log(data);
            this.productos = data;
        });
    }

    ngOnInit(): void {
        this.apiService.getProducts().subscribe(data => {
            console.log(data);
        });
    }

    onPagar() {
        Dialogs.alert({
            title: "Pago Exitoso!",
            message: "Gracias por su compra",
            okButtonText: "Ok",
            cancelable: true,
        });
        this.router.navigate(['/home']);
    }

    onCancelar() {
        Dialogs.alert({
            title: "Cancelado!",
            message: "Ha sido cancelado",
            okButtonText: "Ok",
            cancelable: true,
        });
        this.router.navigate(['/productos']);
    }

    onAgregar() {
        const nuevoProducto = {
            nombre: 'producto',
            precio: 10
        };
    
        this.carrito.push(nuevoProducto);
        
        // Agregar el producto a la lista de productos agregados
        this.productosAgregados.push(nuevoProducto);
    
        this.router.navigate(['/home']);
    }

    abrirCarrito() {
        this.mostrarCarrito =  !this.mostrarCarrito;
    }
    
>>>>>>> origin/Deivy
}