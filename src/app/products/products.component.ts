import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../Model/product.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthentificationService} from '../services/authentification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products! : Array<Product>
  currentPage : number=0;
  pageSize: number = 5;
  totalPages : number = 0;
  errMessage!:string;
  searchFormGroup! : FormGroup;
  currentAction : string = "all"

  constructor(private productsSevices:ProductService,private fb:FormBuilder,public AuthService:AuthentificationService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
       keyword  : this.fb.control(null),
    });
    this.handleGetPageProDuct()

  }
  handleGetPageProDuct(){
    this.productsSevices.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products = data.products;
        this.totalPages = data.totalPages
      },
      error:(err)=>{
        this.errMessage = err
      }
    })
  }

  handleGetAllProDuct(){
    this.productsSevices.getAllProducts().subscribe({
      next:(data)=>{
        this.products = data
      },
      error:(err)=>{
        this.errMessage = err
      }
    })
  }
  handelDeleteProduct(products: any) {
    let conf = confirm("Are you sure ?")
    if (conf==false) return;
    this.productsSevices.deleteProduct(products.id).subscribe({
      next:(data)=>{
        //this.handelDeleteProduct()
        let index = this.products.indexOf(products);
        this.products.splice(index,1)
      }
    })
  }

  handelselectPromotion(product:Product) {
    let promo = product.promotion
    this.productsSevices.setPromotion(product.id).subscribe({
      next : (data)=>{
        console.log("ok")
      product.promotion = !promo ;
    },
      error:err =>{
        this.errMessage =err
      }
    })
  }

  handleSearchProducts() {
    this.currentAction = "search";
    let keyword = this.searchFormGroup.value.keyword;
    this.productsSevices.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products = data.products
        this.totalPages = data.totalPages
      }
    })
  }

  gptoPage(i: number) {
    this.currentPage = i
    if (this.currentAction=="all")
    this.handleGetPageProDuct()
    else
      this.handleSearchProducts();
  }
}
