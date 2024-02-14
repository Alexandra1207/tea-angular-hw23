import { Pipe, PipeTransform } from '@angular/core';
import {ProductType} from "../types/product.type";

@Pipe({
  name: 'searchProducts'
})
export class SearchProductsPipe implements PipeTransform {

  transform(products: ProductType[], searchText: string): ProductType[] {
    if (!searchText) {
      return products;
    }
    return products.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
  }
  // transform(products: ProductType[], searchTerm: string): ProductType[] {
  //   if (!searchTerm) {
  //     return products;
  //   } else {
  //     return products.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  //   }
  // }

  // transform(products: ProductType[]): ProductType[] {
  //   return products.filter(item => item.title.toLowerCase().includes('виш'));
  // }

  // transform(products: ProductType[], searchValue: string): ProductType[] {
  //   return products.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
  // }
}
