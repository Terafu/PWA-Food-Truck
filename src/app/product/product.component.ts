import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  	product: Product;

  constructor(private articleService: ProductService) { }

  ngOnInit() {
  }

}
