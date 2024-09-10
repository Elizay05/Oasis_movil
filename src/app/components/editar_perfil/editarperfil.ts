import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from '@nativescript/core';
import { Dialogs } from '@nativescript/core';
import { ApiService } from './api.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'editarperfil',
  templateUrl: './editarperfil.html',
  styleUrls: ['./editarperfil.css']
})
export class EditarPerfilComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  foto: string = ''; // URL o path de la foto de perfil
  userId: number; // Variable para almacenar el ID del usuario

  constructor(private router: Router, private page: Page, private apiService: ApiService) {
    const perfil = JSON.parse(localStorage.getItem('Oasis.user') || '{}');
    this.nombre = perfil.nombre || '';
    this.email = perfil.email || '';
    this.foto = perfil.foto || ''; // Mantener la foto sin cambios
    this.userId = perfil.user_id; // Asignar el ID del usuario
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  public onTap() {
    this.router.navigate(["home"]);
  }

  public actualizarPerfil() {
    if (this.userId) {
      this.apiService.actualizarPerfil(this.userId, this.nombre, this.email, this.foto).subscribe(
        response => {
          localStorage.setItem('Oasis.user', JSON.stringify({
            nombre: this.nombre,
            email: this.email,
            foto: this.foto,
            user_id: this.userId // Mantener el ID del usuario
          }));

          Dialogs.alert({
            title: "Éxito",
            message: "¡Perfil actualizado correctamente!",
            okButtonText: "OK"
          }).then(() => {
            this.router.navigate(["/perfil"]);
          });
        },
        error => {
          console.error("Error al actualizar el perfil: ", error);
          Dialogs.alert({
            title: "Error",
            message: "No se pudo actualizar el perfil. Inténtalo de nuevo más tarde.",
            okButtonText: "OK"
          });
        }
      );
    } else {
      console.error("El ID del usuario es undefined o null.");
      Dialogs.alert({
        title: "Error",
        message: "No se pudo encontrar el ID del usuario. Inténtalo de nuevo.",
        okButtonText: "OK"
      });
    }
  }
}
