import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from '@nativescript/core';
import { ApiService } from './api.service';
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
  password: string = '';
  telefono: string = '';
  mayorEdad: boolean = false;
  fecha_nacimiento: string = ''; // Define la variable para la fecha de nacimiento
  cedula: string = ''; // Define la variable para la cédula
  foto: "";
  rol: number = 0;
  estado: number = 0;
  termsAccepted: boolean = false;
  updateButtonEnabledState: boolean = false;
  


  public constructor(
    private router: Router,
    private page: Page,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  public onTap(): void {
    this.router.navigate(["home"]);
  }

  public registrar(): void {
    console.log(this.nombre);
    const usuario = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      fecha_nacimiento: this.fecha_nacimiento,
      cedula: this.cedula,
      mayorEdad: this.mayorEdad,
      foto: this.foto,
      rol: 4,  // Asumiendo que 4 es el rol por defecto para un nuevo usuario
      estado: 1 // Asumiendo que 1 es el estado activo por defecto
      
    };
  
    console.log('Usuario a registrar:', usuario);

    // Verificar si se han aceptado los términos y condiciones
    if (!this.termsAccepted || !this.mayorEdad) {
      Dialogs.alert({
          title: 'Alerta',
          message: 'Debes aceptar los términos y condiciones y confirmar que eres mayor de edad para registrarte.',
          okButtonText: 'OK',
          cancelable: true,
      });
      return;
    }

    this.apiService.registrarUsuario(usuario).subscribe(
      response => {
        console.log('Usuario registrado con éxito', response);
        Dialogs.alert({
          title: 'Info!',
          message: '¡Usuario registrado correctamente!',
          okButtonText: 'OK',
          cancelable: true,
        });
        this.router.navigate(['login']); // Cambia esta ruta según sea necesario
      },
      error => {
        console.error('Error al registrar el usuario', error);
        console.log('Encabezados de la solicitud:', error.headers.keys()); // Imprime los nombres de los encabezados de la solicitud
        console.log('Encabezado de autorización:', error.headers.get('Authorization')); // Imprime el encabezado de autorización de la solicitud // Imprime los encabezados de la solicitud
        if (error.status === 400) {
          Dialogs.alert({
            title: 'Alerta',
            message: 'Error al registrar el usuario. Por favor, verifica los datos ingresados.',
            okButtonText: 'OK',
            cancelable: true,
          });
        } else {
          Dialogs.alert({
            title: 'Error',
            message: 'Ha ocurrido un error al registrar el usuario. Por favor, inténtalo nuevamente más tarde.',
            okButtonText: 'OK',
            cancelable: true,
          });
        }
      }
    );
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
      case "password":
        this.password = value;
        break;
      case "telefono":
        this.telefono = value;
        break;
      case "fecha_nacimiento":
        this.fecha_nacimiento = value;
        break;
      case "cedula":
        this.cedula = value;
        break;
      // Agrega más casos según sea necesario para otros campos
      default:
        console.log("Campo no reconocido");
    }
  }
  onTermsAcceptedChange(args): void {
    this.termsAccepted = args.object.checked;
    console.log('El valor de termsAccepted ha cambiado:', this.termsAccepted);
}
onCheckChanged(args): void { 
      this.mayorEdad = args.object.checked;
      console.log('El valor de mayorEdad ha cambiado:', this.mayorEdad);
}


public navigateToTerms(): void {
  openUrl('https://596fb6f7-b142-4dc5-a69f-c2b5acfab0c2-00-3918dlab8s5i9.riker.replit.dev/tyc/');
}

}
