import { Injectable } from '@angular/core';
import {Cart} from '../models/cart';
import {RawCart} from '../models/raw-cart';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CartService {

  constructor(private http: HttpClient) { }

    public addCart(newCart : RawCart): Observable<Cart> {
    	return this.http.post<Cart>(`http://localhost:3000/carts`, newCart);
  	}

}
