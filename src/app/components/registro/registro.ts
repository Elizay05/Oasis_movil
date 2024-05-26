import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { ApiService} from './api.service';
import { Dialogs } from '@nativescript/core';

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

public constructor(
    private router: Router,
    private page: Page,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  public onTap(): void {
    this.router.navigate(["home"]);
  }

  public registrar(): void {
    const usuario = {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        telefono: this.telefono,
        mayorEdad: this.mayorEdad,
        rol: 4,  // Asumiendo que 4 es el rol por defecto para un nuevo usuario
        estado: 1, // Asumiendo que 1 es el estado activo por defecto
        foto: 'http://0.0.0.0:8000/tienda/Img_usuarios/default.png', // URL por defecto para la foto
        token_recuperar: ''
    };

    this.apiService.registrarUsuario(usuario).subscribe(
        response => {
            console.log('Usuario registrado con éxito', response);
            localStorage.setItem('Oasis.token', response.token);
            localStorage.setItem('Oasis.user', JSON.stringify(response.user));
            Dialogs.alert({
                title: 'Info!',
                message: '¡Usuario registrado correctamente!',
                okButtonText: 'OK',
                cancelable: true,
            });
            this.router.navigate(['home']); // Cambia esta ruta según sea necesario
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
}
