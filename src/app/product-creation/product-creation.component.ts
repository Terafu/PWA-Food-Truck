import { Component, OnInit, Input } from '@angular/core';
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

	@Input()
  	product: Product;

	productForm : FormGroup;
	fileToUpload: File = null;
	image : any;
	modification : boolean;

	constructor(private fb: FormBuilder, private productService : ProductService, private router : Router, private activatedRoute  : ActivatedRoute) { }

	ngOnInit() {

		this.productForm = this.fb.group({
			'title': ['', Validators.required ],
			'details' : ['', Validators.required ],
			'price' : ['', Validators.required ],
		});

		this.modification = false;
	  	this.activatedRoute.params.subscribe( params => {
			if (params && params['id']){

				this.productService.getProduct(params['id']).subscribe(
					(fetchedProduct: Product) => {

					this.product = fetchedProduct;

					this.productForm.controls['title'].setValue(this.product.title);
					this.productForm.controls['details'].setValue(this.product.details);
					this.productForm.controls['price'].setValue(this.product.price);
					this.image = this.product.picture;

					this.modification = true;
				});

			}
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
		if(this.modification){
			this.updateProduct();
		}else{
			this.createProduct();
		}
	}

	createProduct(){
		const formModel = this.productForm.value;
		const rawProduct : RawProduct = {
		  title : formModel.title,
		  details : formModel.details,
		  price : formModel.price,
		  picture : this.image
		}
	    this.productService.addProducts(rawProduct).subscribe((newProduct)=>{
			//this.router.navigate(['/product/' + newProduct.id]);
			this.router.navigate(['/menu'])
		});
	}

	updateProduct(){
		const formModel = this.productForm.value;

		this.product.title = formModel.title;
		this.product.details = formModel.details;
		this.product.price = formModel.price;
		this.product.picture = this.image

	  	this.productService.putProduct(this.product.id, this.product).subscribe(()=>{
			//this.router.navigate(['/articles/' + this.product.id]);
			this.router.navigate(['/admin']);
		});
	}

}
