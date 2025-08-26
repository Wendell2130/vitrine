import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';

@Component({
  selector: 'app-navbar-admim-component',
  standalone: false,
  templateUrl: './navbar-admim-component.html',
  styleUrl: './navbar-admim-component.scss'
})
export class NavbarAdmimComponent {
  productName: string = '';
  productService = inject(ProductService);
  
  onFilter(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.productService.filterProductsByTerm(term);
    
  } 
  ngOnDestroy(): void {
     this.productService.filterProductsByTerm("");
  }
}
