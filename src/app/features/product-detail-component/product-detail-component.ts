import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { Iproduct } from '../../models/product-interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart-service';
import { Icart } from '../../models/cart-interface';
import { AuthService } from '../../core/services/auth-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent {
  productService = inject(ProductService);
  private _route = inject(ActivatedRoute);
  cartService = inject(CartService);
  authService = inject(AuthService);
  product: Iproduct | null = null;

  ngOnInit() {
    const idProduct = this._route.snapshot.params['id'];

    this.productService.getProductById(idProduct).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart() {
    if (!this.authService.isLoggedIn()) {
      alert('Usuário não logado. Faça login para adicionar produtos ao carrinho.');
      return;
    }
    this.cartService.productsInCart.update((products) => {
      const existingProduct = products.find(p => p.id === this.product?.id);
      if (existingProduct) {
        alert('Product already in cart');
        return products;
      } else if (this.product) {
        this.product.quantity = 1; // Adiciona a propriedade quantity
        return [...products, this.product];
      }
      return products;
    });
   console.log(this.cartService.productsInCart());

  }

}

