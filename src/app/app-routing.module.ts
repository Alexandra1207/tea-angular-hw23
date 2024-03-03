import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./views/main/main.component";
import {OrderComponent} from "./views/order/order.component";
import {ProductsComponent} from "./views/products/products/products.component";
import {ProductComponent} from "./views/products/product/product.component";

const routes: Routes = [
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
