import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from "@angular/router";
import { Application, Page, TextField } from '@nativescript/core';
import { ApiService } from './api.service';
import { Dialogs } from '@nativescript/core';
import { ActivatedRoute } from '@angular/router';
import { openUrl } from '@nativescript/core/utils';
import { filter } from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ["./login.css"]
})
export class LoginComponent {
    email: string = "";
    password: string = "";
    termsAccepted: boolean = false;
    loggedIn: boolean = false;
    private backPressedSubscription: any;

    public constructor(private router: Router, private apiService: ApiService, private activatedRoute: ActivatedRoute,private page: Page) {
        // Use the component constructor to inject providers.
        console.info("Averiguando si hay datos...");
        if (localStorage.getItem('Oasis.token')) {
            console.log("Bienvenido " + JSON.parse(localStorage.getItem('Oasis.user')).nombre + "!!");
            this.loggedIn = true; // Establecer como iniciado sesión para evitar el mensaje de confirmación
            this.router.navigate(['home']);
        }
        // Suscribirse al evento de navegación de Android para manejar el botón de retroceso
        Application.android.on(Application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            if (!this.loggedIn) {
                // Mostrar cuadro de diálogo de confirmación solo en la página de inicio de sesión
                if (this.router.isActive('/login', false)) {
                    args.cancel = true; // Cancelar el evento de retroceso para evitar la navegación estándar

                    Dialogs.confirm({
                        title: 'Confirmar salida',
                        message: '¿Seguro que deseas salir de la aplicación?',
                        okButtonText: 'Sí',
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result) {
                            // Sí seleccionado, salir de la aplicación
                            Application.android.foregroundActivity.finish();
                        }
                    }).catch((error) => {
                        console.log("Dialog closed unexpectedly: " + error);
                    });
                }
            }
        });
    }

    inputChange(args, campo) {
        // blur event will be triggered when the user leaves the TextField
        let textField = <UITextField>args.object;
        if (campo == "email") {
            this.email = textField.text;
        }
        else if (campo == "password") {
            this.password = textField.text;
        }
    }
    ngOnInit() {
        this.page.actionBarHidden = true;

        this.backPressedSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            if (event.url !== '/login') {
                // El usuario ha navegado fuera de la página de inicio de sesión
                this.loggedIn = true; // Marcar como iniciado sesión para evitar el mensaje de confirmación
            }
        });

      }
    public loguear() {
        let data = {
            username: this.email,
            password: this.password
        };
        console.log(data)
        if (!this.termsAccepted) {
            Dialogs.alert({
                title: 'Alerta',
                message: 'Debes aceptar los términos y condiciones.',
                okButtonText: 'OK',
                cancelable: true,
            });
            return;
        }
        this.apiService.login(data).subscribe((res) => {
            if (res && res.token.length > 0) {
                console.info(res)
                localStorage.setItem('Oasis.token', res.token);
                localStorage.setItem('Oasis.user', JSON.stringify(res.user));
                Dialogs.alert({
                    title: 'Info!',
                    message: 'Bienvenido!!',
                    okButtonText: 'OK',
                    cancelable: true,
                });
                //this.router.navigate(['categorias'], { queryParams: { token: res.token } });
                this.router.navigate(['home']);
            }
        }, error => {
            console.log(error.status)
            if (error.status == 400) {
                Dialogs.alert({
                    title: 'Alerta',
                    message: 'Usuario o contraseña incorrectos',
                    okButtonText: 'OK',
                    cancelable: true,
                });
            }
            else {
                Dialogs.alert({
                    title: 'Respuesta:',
                    message: error.error.message,
                    okButtonText: 'OK',
                    cancelable: true,
                });
            }
        });
    }
    public onRegistrarse() {
        this.router.navigate(["registro"])
    }
    public onTap() {
        this.router.navigate(["home"])
    }
    public onTermsAcceptedChange(args): void {
        this.termsAccepted = args.object.checked;
        console.log('El valor de termsAccepted ha cambiado:', this.termsAccepted);
    }
    public navigateToTerms(): void {
        openUrl('https://elizay05.pythonanywhere.com/tyc/');
    }
}