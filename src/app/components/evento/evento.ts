import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page, TextField } from '@nativescript/core';
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { Dialogs } from '@nativescript/core'
import {ApiService} from './api.service'

@Component({
  selector: 'evento',
  templateUrl: './evento.html',
  styleUrls: ['./evento.css'],
})
export class EventoComponent {
  eventos: any[];
  public constructor(private router: Router, private apiService: ApiService, private page: Page) {
    this.obtenerTodos();
  }

  public obtenerTodos(){
    console.log('eventos')//para ver si entraba o no
    this.apiService.getEvents().subscribe((data: any[]) => {
        console.log(data);
        this.eventos = data;
    }); 
  }
  onItemTap(item: any) {
    let register = item
    //console.log(`Index: ${args.index}; Item: ${register.id}`);
    //console.log(`ID: ${register.id} - NOMBRE: ${register.nombre_cat} - DESCRCIPCIÓN: ${register.desc} `)

    //Consultar por ID en la API
    this.apiService.getRegisterById(register.id).subscribe((res) => {
        Dialogs.alert({
            title: 'Detalles!',
            message: `ID: ${res.id}\nNOMBRE: ${res.nombre}\nFECHA: ${res.fecha}\nHORA INICIO: ${res.hora_incio}\nDESCRIPCION: ${res.descripcion}\nFOTO: ${res.foto}`,
            okButtonText: 'OK',
            cancelable: true,
        });
        console.info(res)
    });
  }

  /*
  public eliminarEve(item){
    Dialogs.confirm({
        title: 'Confirmación',
        message: 'Está seguro de eliminar este registro ?',
        okButtonText: 'SI',
        cancelButtonText: 'No',
        neutralButtonText: 'Cancelar',
        })
        .then((result) => {
            console.log(result);
            if (result){
                this.apiService.deleteRegister(item.id).subscribe((res: string) => {
                    Dialogs.alert({
                        title: 'Respuesta:',
                        message: "Evento eliminado correctamente!!",
                        okButtonText: 'OK',
                        cancelable: true,
                    });
                    this.obtenerTodos();
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
                    if (error.status == 404){
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
        });

  }
  public editarEve(item){
    console.log(`Editar Eve: ${item.id}`)
    this.router.navigate(['eventos-editar'], { queryParams: { id: item.id } });
  }*/

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"]);
  }
  public onVerMas() {
    this.router.navigate(["info_evento"]);
  }
}
