import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  addToCart(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiUrl}/cart`, product);
  }
  getCartItems(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/cart`);
  }
  clearCart(): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/cart`);
  }
  checkout(products: Product[]): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/checkout`, products);
  }
}
