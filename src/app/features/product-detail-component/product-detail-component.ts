import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { Iproduct } from '../../models/product-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart-service';

import { AuthService } from '../../core/services/auth-service';


@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent {
  productService = inject(ProductService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  cartService = inject(CartService);
  authService = inject(AuthService);
  product: Iproduct | null = null;
  halfStar: Boolean = false;

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
        alert('Produto já está no carrinho');
        return products;
      } else if (this.product) {
        this.product.quantity = 1; // Adiciona a propriedade quantity
        alert('Produto adicionado ao carrinho');
        return [...products, this.product];

      }
      return products;
    });


  }
  getArrayFromNumber(n: number): number[] {
    const nRounded = Math.floor(n); // garante que n é um inteiro
    if (n - nRounded >= .5) this.halfStar = true;
    return Array.from({ length: nRounded }, (_, i) => i); // retorna [0,1,2,...,n-1]
  }

  goBack() {
    this._router.navigate(['/home']);
  }

}

