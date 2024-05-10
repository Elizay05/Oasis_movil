import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page, TextField, Observable } from '@nativescript/core';
import { ApiService } from '../evento/api.service';

@Component({
  selector: 'evento_carrito',
  templateUrl: './evento_carrito.html',
  styleUrls: ['./evento_carrito.css'],
})
export class EventoCarritoComponent implements OnInit {
  public eve_carrito = {}
  public options: Array<string>;
  public selectedIndex: number;

  public constructor(private router: Router, private page: Page, private apiService: ApiService, private route: ActivatedRoute) {
    // Use the component constructor to inject providers.
    this.options = ["Mesa 08 (x7 Personas)", "Mesa 29 (x4 Personas)", "Mesa 68 (x5 Personas)"];
    this.selectedIndex = 0; // Opción predeterminada seleccionada
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.route.queryParams.subscribe((params) => {
      const { id, nombre, fecha, hora_incio, descripcion, foto } = params;
      this.eve_carrito = { id, nombre, fecha, hora_incio, descripcion, foto };
      console.log(this.eve_carrito);
    });
  }

  public onTap(){
    this.router.navigate(["info_evento"]);
  }

  public onInfoEve(item){
    console.log(`Info Eve: ${item.id}`)
    this.router.navigate(['info_evento'], { queryParams: { id: item.id } });
  }
}