import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { ProductsQuantity } from '../models/productsQuantity';
import { RawProductsQuantity } from '../models/raw-productsQuantity';
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

  showValidate : boolean;

  constructor(private articleService: ProductService, private modalService: NgbModal) {
    this.showValidate = navigator.onLine;
  }

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
    //Si nous avons déjà des produits stocké
    if(window.localStorage.getItem("selectedProducts")){

      var exist = false
      var b = JSON.parse(window.localStorage.getItem("selectedProducts"));
      var i = 0
      var a = new Array();

      //On rentre dans le cas ou nous n'avons qu'un élément
      if(!Number.isInteger(b.length)){
        a.push(b);

        if(b.productId == this.product.id){
          var prd : RawProductsQuantity = { productId : this.product.id , quantity : b.quantity + 1};
          window.localStorage.setItem("selectedProducts", JSON.stringify(prd));
        }
        else{
          var prd : RawProductsQuantity = { productId : this.product.id , quantity : 1};
          a.push(prd)
          window.localStorage.setItem("selectedProducts", JSON.stringify(a));
        }
      }
      //Lorsque nous avons plusieurs éléments
      else{
        var id = this.product.id
        var size = b.length
        a = b;

        b.forEach(function(elt){
	        //Si le produit est déjà présent dans la liste
	        if(elt.productId == id){
	          exist = true
	          elt.quantity++;
	          window.localStorage.setItem("selectedProducts", JSON.stringify(a));
	          return;
	        }
	        //Si le produit n'est pas présent dans la liste
	        if(i+1 == size && !exist){
	          var prd : RawProductsQuantity = { productId : id , quantity : 1};
	          a.push(prd)
	          window.localStorage.setItem("selectedProducts", JSON.stringify(a));
	        }
	        i++;
	    })
      }


    }
    //Dans le cas ou nous n'avons toujours pas d'article stocké
    else {
      var prd : RawProductsQuantity = { productId : this.product.id , quantity : 1};
      window.localStorage.setItem("selectedProducts", JSON.stringify(prd));
    }

  }
}
