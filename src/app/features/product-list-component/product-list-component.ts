import { Component, inject } from '@angular/core';
import { Iproduct } from '../../models/product-interface';
import { ProductService } from '../../core/services/product-service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.scss'
})
export class ProductListComponent {
  products$:Observable<Iproduct[]>=of([]);
  productService=inject(ProductService);

  ngOnInit(){
    this.products$=this.productService.getProducts();
  }
}
