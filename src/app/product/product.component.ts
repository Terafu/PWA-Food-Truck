import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import {ProductService} from '../services/product.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  closeResult: string;

  @Input()
  product: Product;

  @Input()
  modif:boolean;

  @Output()
  deletedProduct : EventEmitter<Product> = new EventEmitter();

  cart : CartComponent;

  constructor(private articleService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  delete(){
    this.deletedProduct.emit(this.product);
  }

  addCart(){
    
    if(window.localStorage.getItem("selectedProducts")){

    }else {
      window.localStorage.setItem("selectedProducts", this.product);
    }
    
  }
}
