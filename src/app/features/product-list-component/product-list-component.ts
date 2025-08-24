import { Component, computed, inject, signal, Signal } from '@angular/core';
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
 
  productService=inject(ProductService);
  filteredProducts:Signal<Iproduct[]> = signal([]);

  ngOnInit(): void {
    this.filteredProducts=computed(()=>this.productService.products());
  }
  filter(event:Event){
      console.log((event.target as HTMLInputElement).value);
    const term=(event.target as HTMLInputElement).value;
    this.filteredProducts=computed(()=>
      this.productService.products().
    filter(product => product.title.toLowerCase().includes(term.toLowerCase())))
  }
}
