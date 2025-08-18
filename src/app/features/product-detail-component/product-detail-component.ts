import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { Iproduct } from '../../models/product-interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent {
  productService=inject(ProductService);
  private _route=inject(ActivatedRoute);
  cartService=inject(CartService);
  product:Iproduct | null=null;

  ngOnInit(){
    const id=this._route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe((product)=>{
      this.product=product;
    });
  }

  addToCart(){
  
  }
}
