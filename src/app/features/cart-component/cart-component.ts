import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service';

import { map, Observable, of } from 'rxjs';
import { AuthService } from '../../core/services/auth-service';
import { CartView } from '../../models/cart-view-intercface';
import { ProductService } from '../../core/services/product-service';


@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  productService = inject(ProductService);
  currentCart$: Observable<CartView[] | null> = of(null);
  cartsView$: Observable<CartView[] | null> = of(null);




  ngOnInit() {
    const idUser = this.authService.currentUser()?.id;
    if (idUser) {
      this.cartsView$ = this.cartService.getCartsViewByIdUser(idUser);
    } else {
      alert('usuário não logado ao acessar o carrinho');
    }
    
  }

  get cartActualTotal(): string {
    return this.cartService.productsInCart().reduce(
      (sum, product) => sum + (product.price * (product.quantity ?? 1)), 0).toFixed(2);
  }
  
  getCartProductsTotal(cart:CartView): number {
    return cart.products.reduce((sum, product) => sum + (product.price * (product.quantity ?? 1)), 0);
  }
  addOne(productId: number) {
    this.cartService.productsInCart.update((products) => {
      return products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: (product.quantity || 0) + 1
          };
        }
        return product;
      });


    });
  }

  subtractOne(productId: number) {
    this.cartService.productsInCart.update((products) => {
      return products.map((product) => {
        if (product.id === productId && (product.quantity ?? 1) > 1) {
          return {
            ...product,
            quantity: (product.quantity || 1) - 1
          };
        }
        return product;
      });
    });
  }

  removeProduct(productId: number) {
    const confirmation = confirm('Tem certeza que deseja remover este produto do carrinho?');
    if (confirmation) {
      this.cartService.productsInCart.update((products) => {
        return products.filter(product => product.id !== productId);
      });
    }

  }

}
