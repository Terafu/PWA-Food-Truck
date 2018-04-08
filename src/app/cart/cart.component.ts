import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
<<<<<<< HEAD
import { RawProductsQuantity } from '../models/raw-productsQuantity';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
=======
import { ProductsQuantity } from '../models/raw-productsQuantity';
>>>>>>> e7601e1904058f60cf14b7967c3e74915d1213c7

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	products : any;
<<<<<<< HEAD
	productQty : RawProductsQuantity[];
	burgers : Burger[];
	bgr : any
=======
	productQty : ProductsQuantity[];
>>>>>>> e7601e1904058f60cf14b7967c3e74915d1213c7

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
