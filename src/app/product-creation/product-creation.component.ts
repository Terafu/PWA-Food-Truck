import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RawProduct } from '../models/raw-product';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

	productForm : FormGroup;
	fileToUpload: File = null;
	image : any;

	constructor(private fb: FormBuilder, private productService : ProductService, private router : Router) { }

	ngOnInit() {

		this.productForm = this.fb.group({
			'title': ['', Validators.required ],
			'details' : ['', Validators.required ],
			'price' : ['', Validators.required ],
		});
	}

	handleFileInput(files: FileList) {
    	this.fileToUpload = files.item(0);

    	var myReader:FileReader = new FileReader();

  		myReader.onloadend = (e) => {
    		this.image = myReader.result;
  		}
  		myReader.readAsDataURL(this.fileToUpload);
	}

	actionProduct(){
		this.createProduct();
	}

	createProduct(){
		const formModel = this.productForm.value;
		const rawProduct : RawProduct = {
		  title : formModel.title,
		  details : formModel.details,
		  price : formModel.price,
		  picture : this.image
		}
	    this.productService.add(rawProduct).subscribe((newProduct)=>{
			//this.router.navigate(['/product/' + newProduct.id]);
			this.router.navigate(['/menu'])
		});
	}

}
