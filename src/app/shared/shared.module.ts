import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {CutTextPipe} from "./pipes/cut-text.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    CutTextPipe
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    CutTextPipe
  ]
})
export class SharedModule { }
