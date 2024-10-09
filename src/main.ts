import { platformNativeScriptDynamic, NativeScriptModule } from '@nativescript/angular';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { appComponents, appRoutes } from './app/app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@nstudio/nativescript-barcodescanner';


import * as appSettings from '@nativescript/core/application-settings'

@NgModule({
  declarations: [AppComponent, ...appComponents],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [
    BarcodeScanner
  ],
  schemas: [NO_ERRORS_SCHEMA],
})


class AppComponentModule {}

/* API web IP */
global.url = "http://10.171.68.196:8000";

/* global.urlLocalSayi = "http://192.168.20.8:8000" */
/* global.urlLocalSena = "http://10.171.68.196:8000" */


global.localStorage = {
  getItem(key: string) {
      return appSettings.getString(key);
  },
  setItem(key: string, value: string) {
      return appSettings.setString(key, value);
  },
  length:0,
  clear(){
      return appSettings.clear();
  },
  key(index){
      return "";
  },
  removeItem(key){
      return appSettings.remove(key);
  }
}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule)

