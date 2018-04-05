import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {RawProduct} from '../models/raw-product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products`);
  }

   public add(newProduct : RawProduct): Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/products`, newProduct);
  }

}
