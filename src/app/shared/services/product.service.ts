import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {OrderType} from "../../../types/order.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<ProductType> | undefined {
    return this.http.get<ProductType>(environment.apiURL + `tea?id=${id}`);
  }

  createOrder(data: OrderType) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + `order-tea`, data);
  }

  getProducts(queryParams: string = ''): Observable<ProductType[] | Record<string, ProductType>> {
    return this.http.get<ProductType[] | Record<string, ProductType>>(environment.apiURL + 'tea' + (queryParams ? ('?search' + queryParams) : ''));
  }
}
