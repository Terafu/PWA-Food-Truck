import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../services/product.service';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _product: Observable<Product[]>;

  constructor(config: NgbCarouselConfig, private _http: HttpClient, private productService: ProductService) {
    // customize default values of carousels used by this component tree
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {
    this._product = this.productService.getProducts();
  }

  products(): Observable<Product[]> {
    return this._product;
  }
}
