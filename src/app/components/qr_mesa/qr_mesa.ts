import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page, TextField } from '@nativescript/core';
import { BarcodeScanner } from '@nstudio/nativescript-barcodescanner';
import { QrMesaService } from './qr_mesa.service';
import { MesaService } from '../../shared/services/mesa.service';



@Component({
  selector: 'qr_mesa',
  templateUrl: './qr_mesa.html',
})
export class QrMesaComponent {
  public constructor(private router: Router, private page: Page, private barcodeScanner: BarcodeScanner, private qrService: QrMesaService, private mesaService: MesaService) {
    // Use the component constructor to inject providers.
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"]);
  }
  public onEscaneado(){
    this.router.navigate(["pedido"]);
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
      console.log('Scanned QR Code: ', result.text);
      alert('Scanned QR Code: '+ result.text);
      const data = {
        'mesa': result.text,
        'email': localStorage.getItem("email")
      }
      this.qrService.activarMesa(data).subscribe((res) => {
        if (res.success) {
          this.mesaService.mesa = res.mesa
          this.router.navigate(["pedido"]);
        }
      })
    }, error => {
      console.log('QR Code scanning fail¨ed: ', error);
      alert('QR Code Scanning failed: ' + error);
    });
  }
}