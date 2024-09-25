import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { BarcodeScanner } from '@nstudio/nativescript-barcodescanner';
import { MesaService } from '../../shared/services/mesa.service';
import { Dialogs } from '@nativescript/core';




@Component({
  selector: 'qr_mesa',
  templateUrl: './qr_mesa.html',
})
export class QrMesaComponent {

  public constructor(private router: Router, private page: Page, private barcodeScanner: BarcodeScanner, private mesaService: MesaService) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

  abrirCamara() {
    this.barcodeScanner.scan({
      formats: 'QR_CODE',
      cancelLabel: 'cancelar',
      message: 'Coloca el QR dentro del cuadro',
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      resultDisplayDuration: 500,
      beepOnScan: true,
      openSettingsIfPermissionWasPreviouslyDenied: true
    }).then(result => {
      const mesa = result.text;
        this.mesaService.obtenerMesaQr(mesa).subscribe(
          (data: any) => {
            const mesa = data.mesa.nombre;
            const codigo_qr = data.mesa.codigo_qr;
            this.router.navigate(["pedido", codigo_qr, mesa]);
          },
          (error) => {
            Dialogs.alert({
              title: "Error",
              message: "No se encontró la mesa correspondiente al QR escaneado.",
              okButtonText: "Ok"
            });
            console.error(error);
          }
        );
      }, error => {
        Dialogs.alert({ title: "Error", message: error, okButtonText: "Ok" });
    });
  }

  public onTap(){
    this.router.navigate(["home"]);
  }
  
}