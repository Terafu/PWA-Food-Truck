import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { RawProductsQuantity } from '../models/raw-productsQuantity';
import { RawCart} from '../models/raw-cart';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	products : any;
	productQty : RawProductsQuantity[];
	burgers : Burger[];
	total : number;

	showValidate : boolean;

	constructor(private productService : ProductService, private cartService : CartService, private router : Router) { 

		this.burgers = new Array();
		this.total = 0;

		this.products = JSON.parse(window.localStorage.getItem("selectedProducts"));

		this.showValidate = navigator.onLine;

		if(this.products != null){

			//Si plusieurs articles sont commandé
			if(Array.isArray(this.products)){

				this.products.forEach(function(elt){
					var brg : any
					this.productService.getProduct(elt.productId).subscribe(fetchedProduct => { 
						 brg = fetchedProduct,
						this.burgers.push({
							id : elt.productId,
							productsQuantity : elt.quantity, 
							name : brg.title, 
							description : brg.details, 
							price : brg.price, 
							picture : brg.picture
						}),
						this.total += brg.price * elt.quantity

					},this);
				}, this);

			}
			else{
				var brg : any
				this.productService.getProduct(this.products.productId).subscribe(fetchedProduct => { 
						 brg = fetchedProduct,
						this.burgers.push({
							id : this.products.productId,
							productsQuantity : this.products.quantity, 
							name : brg.title, 
							description : brg.details, 
							price : brg.price, 
							picture : brg.picture
						}),
						this.total += brg.price * this.products.quantity

					});
			}
		}
		else{
			this.showValidate = false
		}
	}

	ngOnInit() {
	}

	add(content){
		var index : number = 0
		this.burgers.forEach(function(elt){
			if(elt.id == content){
				elt.productsQuantity++;
				this.total = Number(elt.price) + Number(this.total);
			}

			index++
		}, this);
	}

	delete(content){
		var index : number = 0
		this.burgers.forEach(function(elt){
			if(elt.id == content){
				//On regarde si l'élement est présent plusieur fois
				if(elt.productsQuantity > 1){
					elt.productsQuantity -= 1;
				}
				else{
					console.log(index)
					this.burgers.splice(index,1)
				}
				this.total -= elt.price;
			}

			index++
		}, this);
	}

	validate(){
		var burgerIds : number[] = new Array();
		var cpt : number = 0;
		var size : number = this.burgers.length;
		var rawCart : RawCart;

		this.burgers.forEach(function(elt){
			burgerIds.push(elt.id)
			cpt++

			//Lorsque nous avons rajouté tout les ids
			if(cpt == size){
				rawCart = { productsQuantityId : burgerIds, validate : 1, date : Date.now()};

				//On sauvegarde le caddie
				this.cartService.addCart(rawCart).subscribe();

				//On supprime les valeur dans le localStorage
				window.localStorage.removeItem("selectedProducts");
			}
		}, this);
	}

}

export interface Burger {
	id : number,
	productsQuantity: number;
	name : string;
	description : string;
	price : number;
	picture : string;
}
