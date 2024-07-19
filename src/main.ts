import { platformNativeScriptDynamic, NativeScriptModule } from '@nativescript/angular';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { appComponents, appRoutes } from './app/app.routing';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@nstudio/nativescript-barcodescanner';

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


platformNativeScriptDynamic().bootstrapModule(AppComponentModule)
