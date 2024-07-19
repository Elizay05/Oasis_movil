import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { BarcodeScanner } from '@nstudio/nativescript-barcodescanner';



@Component({
    selector: 'productos',
    templateUrl: './productos.html',
    styleUrls: ['./productos.css'],
})
export class ProductosComponent implements OnInit {

    public constructor(private router: Router, private barcodeScanner: BarcodeScanner) {
        // Use the component constructor to inject providers.
    }
    ngOnInit(): void {

    }

}