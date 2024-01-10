import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProduct(id: number) {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  createProduct(newProduct: any) {
    return this.http.post(`${this.apiUrl}/products`, newProduct);
  }

  updateProduct(id: number, updatedProduct: any) {
    return this.http.put(`${this.apiUrl}/products/${id}`, updatedProduct);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
}