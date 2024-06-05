import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Dialogs, Page, TextField } from '@nativescript/core';
import { ApiService } from './api.service';

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
  public constructor(private router: Router, private page: Page,private apiService: ApiService) {
    // Use the component constructor to inject providers.
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"])}

    public eliminarCuenta(): void {
      Dialogs.confirm({
        title: "Confirmación",
        message: "¿Estás seguro de que deseas eliminar tu cuenta?",
        okButtonText: "Sí",
        cancelButtonText: "No",
        cancelable: true,
      }).then(result => {
        if (result) {
          this.apiService.eliminarUsuario(this.email).subscribe(
            response => {
              console.log('Cuenta eliminada con éxito', response);
              Dialogs.alert({
                title: 'Info!',
                message: '¡Cuenta eliminada correctamente!',
                okButtonText: 'OK',
                cancelable: true,
              });
              this.router.navigate(['login']); // Navegar al login después de eliminar la cuenta
            },
            error => {
              console.error('Error al eliminar la cuenta', error);
              Dialogs.alert({
                title: 'Error',
                message: 'Ha ocurrido un error al eliminar la cuenta. Por favor, inténtalo nuevamente más tarde.',
                okButtonText: 'OK',
                cancelable: true,
              });
            }
          );
        }
      });
    }
    
}