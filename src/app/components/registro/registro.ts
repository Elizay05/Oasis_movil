import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from '@nativescript/core';
import { RegistroService } from '~/app/shared/services/registro.service';
import { Dialogs } from '@nativescript/core';
import { openUrl } from '@nativescript/core/utils';

@Component({
  selector: 'registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';
  mayorEdad: boolean = false;
  fechaNacimiento: string = '';
  cedula: string = '';
  rol: number = 0;
  estado: number = 0;
  termsAccepted: boolean = false;
  updateButtonEnabledState: boolean = false;
  


  public constructor(
    private router: Router,
    private page: Page,
    private registroService: RegistroService
  ) { }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  public onTap(): void {
    this.router.navigate(["home"]);
  }

  public registrar(): void {  
    if (!this.termsAccepted) {
      Dialogs.alert({
          title: 'Alerta',
          message: 'Debes aceptar los términos y condiciones para registrarte.',
          okButtonText: 'OK',
          cancelable: true,
      });
      return;
    }
  
    const isMayorEdad = this.calculateAge(this.fechaNacimiento) >= 18;
  
    if (!isMayorEdad) {
      Dialogs.alert({
        title: 'Alerta',
        message: 'Debes ser mayor de 18 años para registrarte.',
        okButtonText: 'OK',
        cancelable: true,
      });
      return;
    }
  
    const usuario = {
      nombre: this.nombre,
      email: this.email,
      password1: this.password1,
      password2: this.password2,
      fechaNacimiento: this.fechaNacimiento,
      cedula: this.cedula,
    };
  
    this.registroService.registrarUsuario(usuario).subscribe(
      response => {
        Dialogs.alert({
          title: 'Info!',
          message: '¡Usuario registrado correctamente!',
          okButtonText: 'OK',
          cancelable: true,
        });
        this.router.navigate(['login']);
      },
      error => {
        if (error.status === 400) {
          Dialogs.alert({
            title: 'Alerta',
            message: error.error.message,
            okButtonText: 'OK',
            cancelable: true,
          });
        } else {
          Dialogs.alert({
            title: 'Error',
            message: error.message,
            okButtonText: 'OK',
            cancelable: true,
          });
        }
      }
    );
  }
  
  private calculateAge(fechaNacimiento: string): number {
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  inputChange(args, campo): void {
    let textField = args.object;
    let value = textField.text;
    switch (campo) {
      case "nombre":
        this.nombre = value;
        break;
      case "email":
        this.email = value;
        break;
      case "password1":
        this.password1 = value;
        break;
      case "password2":
        this.password2 = value;
        break;
      case "fechaNacimiento":
        this.fechaNacimiento = value;
        break;
      case "cedula":
        this.cedula = value;
        break;
      default:
        console.log("Campo no reconocido");
    }
  }
  onTermsAcceptedChange(args): void {
    this.termsAccepted = args.object.checked;
}

public navigateToTerms(): void {
  openUrl('https://elizay05.pythonanywhere.com/tyc/');
}

}
