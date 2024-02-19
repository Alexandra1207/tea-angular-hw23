import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {delay, Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];
  private subscriptionProducts: Subscription | null = null;
  private subscriptionQueryParams: Subscription | null = null;
  // loading: boolean = false;
  // searchValue: string = '';

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {

    // this.loading = true;
    this.subscriptionProducts = this.productService.getProducts()
      // .pipe(
      //   delay(1000) // чтобы показать лоадер
      // )
      .subscribe(
        {
          // next: (data: ProductType[]) => {
          next: (data: ProductType[] | Record<string, ProductType>) => {
            if (Array.isArray(data)) {
              this.products = data;
            }
            // else {
            //
            // }
            // this.loading = false;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/'])
          }
        })
  }

  viewProducts() {

  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }
}

