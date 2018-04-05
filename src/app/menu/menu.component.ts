import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import { Product } from '../models/product';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	private _product: Observable<Product[]>;

	constructor(private productService: ProductService) { }

	ngOnInit() {
		this._product = this.productService.getProducts();
	}

	products(): Observable<Product[]> {
    	return this._product;
  	}

}
