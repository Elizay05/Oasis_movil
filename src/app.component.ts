import { Component, OnInit } from '@angular/core'
import { requestPermissions } from '@nativescript/camera';

requestPermissions().then(
  function success() {
    //Permisos de camara aceptado
},
function failure() {
  //Permisos de camara rechazado
}
);

@Component({
  selector: 'adso',
  template: "<page-router-outlet></page-router-outlet>",
})
export class AppComponent {}
