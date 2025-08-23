import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-product-component',
  standalone: false,
  templateUrl: './table-product-component.html',
  styleUrl: './table-product-component.scss'
})
export class TableProductComponent {

  productsService = inject(ProductService);
  router = inject(Router);

  editProduct(id: number) {
      this.router.navigate(['/admin/edit', id]);
  alert('Edit product with ID: ' + id);
  }
  deleteProduct(arg0: number) {
    throw new Error('Method not implemented.');
  }



}
