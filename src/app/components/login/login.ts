import { Component } from '@angular/core'
import { NavigationEnd, Router } from "@angular/router";
import { Application, Page } from '@nativescript/core';
import { LoginService } from '../../shared/services/login.service';
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

    public constructor(private router: Router, private loginService: LoginService , private activatedRoute: ActivatedRoute,private page: Page) {
        if (localStorage.getItem('Oasis.token')) {
            console.log("Bienvenido " + JSON.parse(localStorage.getItem('Oasis.user')).nombre + "!!");
            this.loggedIn = true;
            this.router.navigate(['home']);
        }
        Application.android.on(Application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            if (!this.loggedIn) {
                if (this.router.isActive('/login', false)) {
                    args.cancel = true; 
                    Dialogs.confirm({
                        title: 'Confirmar salida',
                        message: '¿Seguro que deseas salir de la aplicación?',
                        okButtonText: 'Sí',
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result) {
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
                this.loggedIn = true;
            }
        });

      }
    public loguear() {
        let data = {
            username: this.email,
            password: this.password
        };
        if (!this.termsAccepted) {
            Dialogs.alert({
                title: 'Alerta',
                message: 'Debes aceptar los términos y condiciones.',
                okButtonText: 'OK',
                cancelable: true,
            });
            return;
        }
        this.loginService.login(data).subscribe((res) => {
            if (res && res.token.length > 0) {
                localStorage.setItem('Oasis.token', res.token);
                localStorage.setItem('Oasis.user', JSON.stringify(res.user));
                Dialogs.alert({
                    title: 'Info!',
                    message: 'Bienvenido!!',
                    okButtonText: 'OK',
                    cancelable: true,
                });
                this.router.navigate(['home']);
            }
        }, error => {
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
    }

    public navigateToTerms(): void {
        openUrl('https://elizay05.pythonanywhere.com/tyc/');
    }
}