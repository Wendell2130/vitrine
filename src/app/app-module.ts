import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NavbarComponent } from './shared/navbar-component/navbar-component';
import { ProductCardComponent } from './shared/product-card-component/product-card-component';
import { LoginComponent } from './features/login-component/login-component';
import { CartComponent } from './features/cart-component/cart-component';
import { ProductListComponent } from './features/product-list-component/product-list-component';
import { ProductDetailComponent } from './features/product-detail-component/product-detail-component';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    ProductCardComponent,
    LoginComponent,
    CartComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
