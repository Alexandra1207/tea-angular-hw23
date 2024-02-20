import {Injectable} from '@angular/core';
import {ProductType} from "../types/product.type";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {OrderType} from "../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<ProductType> | undefined {
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

  createOrder(data: OrderType) {
    return this.http.post<{ success: boolean, message?: string }>(`https://testologia.site/order-tea`, data);
  }

  getProducts(queryParams: string = ''): Observable<ProductType[] | Record<string, ProductType>> {
    return this.http.get<ProductType[] | Record<string, ProductType>>('https://testologia.site/tea' + (queryParams ? ('?search' + queryParams) : ''));
  }
}
