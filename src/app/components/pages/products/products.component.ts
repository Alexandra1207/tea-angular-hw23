import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];
  private subscriptionProducts: Subscription | null = null;
  private titleFromUrl: string | null = null;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.clearTitleQueryParam();
    this.subscriptionProducts = this.productService.getProducts()
      .subscribe({
        next: (data: ProductType[] | Record<string, ProductType>) => {
          if (Array.isArray(data)) {
            this.route.queryParamMap.subscribe(params => {
              const titleFromUrl = params.get('title');
              if (titleFromUrl !== this.titleFromUrl) {
                this.titleFromUrl = titleFromUrl;
              }
              this.products = (this.titleFromUrl) ? data.filter(product => product.title.toLowerCase().includes(this.titleFromUrl!.toLowerCase())) : data;
              if (this.products === data) {
                $('#product-title').text('Наши чайные коллекции');
              } else {
                if (this.products.length > 0) {
                  $('#product-title').text(`Результаты поиска по запросу "${this.titleFromUrl}"`);
                } else {
                  $('#product-title').text('Ничего не найдено');
                }
              }
            });
          }
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }

  clearTitleQueryParam() {
    const urlTree = this.router.parseUrl(this.router.url);
    if (urlTree.queryParams['title']) {
      delete urlTree.queryParams['title'];
      this.router.navigateByUrl(urlTree);
    }
  }
}

