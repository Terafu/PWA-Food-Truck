import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	private _product: Observable<Product[]>;

	constructor(private productService: ProductService) { }

	ngOnInit() {
		this._product = this.productService.getProducts();
	}

	products(): Observable<Product[]> {
		return this._product;
	}

	delete(product: Product){
    	this.productService.deleteProducts(product.id).subscribe(()=>{
			this._product = this.productService.getProducts();
    	});
	}

}
