import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {delay} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];
  loading: boolean = false;
  // searchValue: string = '';

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {

    this.loading = true;
    this.productService.getProducts()
      .pipe(
        delay(1000) // чтобы показать лоадер
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            this.loading = false;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/'])
          }
        })
  }
}

