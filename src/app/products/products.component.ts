import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../Model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products! : Array<Product>
  errMessage!:string;
  constructor(private productsSevices:ProductService) {
  }

  ngOnInit(): void {
  this.handleGetAllProDuct()

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
}
