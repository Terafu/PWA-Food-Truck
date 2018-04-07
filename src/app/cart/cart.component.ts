import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { RawProductsQuantity } from '../models/raw-productsQuantity';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	products : any;
	productQty : RawProductsQuantity[];
	burgers : Burger[];
	bgr : any

	constructor(private productService : ProductService) { 

		this.burgers = new Array();

		this.products = JSON.parse(window.localStorage.getItem("selectedProducts"));

			this.products.forEach(function(elt){
				console.log("elt : " + elt.productId)
				this.productService.getProduct(elt.productId).subscribe(fetchedProduct => //this.bgr = fetchedProduct,
					console.log(this)
					/*this.burgers.push({
					productsQuantity : elt.quantity, 
					name : fetchedProduct.title, 
					description : fetchedProduct.details, 
					price : fetchedProduct.price, 
					picture : fetchedProduct.picture}),*/

					);
			}, this);
	}

	ngOnInit() {
	}

}

export interface Burger {
  productsQuantity: number;
  name : string;
  description : string;
  price : number;
  picture : string;
}
