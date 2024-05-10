import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page, TextField, Dialogs } from '@nativescript/core';
import { ApiService } from '../evento/api.service';

@Component({
  selector: 'info_evento',
  templateUrl: './info_evento.html',
  styleUrls: ['./info_evento.css'],
})
export class InfoEventoComponent {

  id: number;
  nombre: string;
  fecha : String;
  hora_incio: String;
  descripcion: string;
  foto : String;

  public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute, private page: Page ) {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        this.id = params.id;
        this.apiService.getRegisterById(params.id).subscribe((res) => {
            console.info(res)
            this.nombre = res.nombre;
            this.fecha = res.fecha;
            this.hora_incio = res.hora_incio;
            this.descripcion = res.descripcion;
            this.foto = res.foto;
        },error => {
            console.log(error.status)
            if (error.status == 400){
                Dialogs.alert({
                    title: 'Respuesta:',
                    message: error.error.message,
                    okButtonText: 'OK',
                    cancelable: true,
                });
            }
            else{
                Dialogs.alert({
                    title: 'Respuesta:',
                    message: error.message,
                    okButtonText: 'OK',
                    cancelable: true,
                });
            }

        });
      }
    );
  }

  public onEveCarrito() {
    const eventData = {
      id: this.id,
      nombre: this.nombre,
      fecha: this.fecha,
      hora_incio: this.hora_incio,
      descripcion: this.descripcion,
      foto: this.foto,
    };
  
    this.router.navigate(["evento_carrito"], { queryParams: eventData });
  }


  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["evento"]);
  }
}