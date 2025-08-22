import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';

@Component({
  selector: 'app-admin-component',
  standalone: false,
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss'
})
export class AdminComponent {
  productsService = inject(ProductService);
}
