import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { ProductsQuantity } from '../models/productsQuantity';
import { ProductService } from '../services/product.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';

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
   /* if(window.localStorage.getItem("selectedProducts")){
      var a = new Array();
      var b = JSON.parse(window.localStorage.getItem("selectedProducts"));
      if(b.length == 1){
        a.push(JSON.parse(window.localStorage.getItem("selectedProducts")));
      } else {
        a = JSON.parse(window.localStorage.getItem("selectedProducts"));
      }

      a.push(this.product.id)

      window.localStorage.setItem("selectedProducts", JSON.stringify(a));

      var exist = false
      var b = JSON.parse(window.localStorage.getItem("selectedProducts"));
      var i = 0
      var a = new Array();
      a.push(b);

      if(!Number.isInteger(b.length)){

        console.log("passe : " + 45)
        if(b.productId == this.product.id){
          console.log("passe : " + 1)
          var prd : RawProductsQuantity = { productId : this.product.id , quantity : b.quantity + 1};
          window.localStorage.setItem("selectedProducts", JSON.stringify(prd));
        }
        else{
          console.log("passe : " + 2)
          var prd : RawProductsQuantity = { productId : this.product.id , quantity : 1};
          a.push(prd)
          window.localStorage.setItem("selectedProducts", JSON.stringify(a));
        }
      }
      else{
        var id = this.product.id
        var size = b.length

        b.forEach(function(elt){ 
          console.log("id local = " + id)
          console.log("id courant = " + elt.productId)
        if(elt.productId == id){
          console.log("passe : " + 3)
          exist = true
          elt.quantity++;
          a = b
          window.localStorage.setItem("selectedProducts", JSON.stringify(a));
          return;
        }
        if(i+1 == size && !exist){
          console.log("passe : " + 4)
          var prd : RawProductsQuantity = { productId : id , quantity : 1};
          a.push(prd)
          window.localStorage.setItem("selectedProducts", JSON.stringify(a));
        }
        i++;
      })
      }
      

    }else {
      var prd : RawProductsQuantity = { productId : this.product.id , quantity : 1};
      window.localStorage.setItem("selectedProducts", JSON.stringify(prd));
    }*/
    
  }
}
