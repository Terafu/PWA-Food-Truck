import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { RawProductsQuantity } from '../models/raw-productsQuantity';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	products : any;
	productQty : RawProductsQuantity[];

	constructor() { }

	ngOnInit() {
		this.products = JSON.parse(window.localStorage.getItem("selectedProducts"));
		this.products.forEach(function(elt){

		});
	}

}
