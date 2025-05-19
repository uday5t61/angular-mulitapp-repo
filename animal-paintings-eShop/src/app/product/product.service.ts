import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/products`);
  }
}
