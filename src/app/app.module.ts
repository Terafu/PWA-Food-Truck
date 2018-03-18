import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderComponent } from './order/order.component';
import { ProductsQuantityComponent } from './products-quantity/products-quantity.component';
import { RouterModule, Routes } from '@angular/router';

import { ProductService } from "./services/product.service";

import { MaterializeModule } from 'angular2-materialize';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent},
  { path : 'contact', component: ContactComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    MenuComponent,
    CartComponent,
    AdminComponent,
    ContactComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    OrderComponent,
    ProductsQuantityComponent
  ],
  imports: [
    RouterModule.forRoot(
          appRoutes,
          { enableTracing: false } // <-- debugging purposes only
        ),
    BrowserModule,
    MaterializeModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
