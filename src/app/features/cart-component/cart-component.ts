import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { Icart } from '../../models/cart-interface';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth-service';
import { CartView, ProductView } from '../../models/cart-view-intercface';
import { ProductService } from '../../core/services/product-service';
import { Iproduct } from '../../models/product-interface';

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

  addOne(productId: number) {
    this.cartService.productsInCart.update((products) => {
      return products.map((product)=>{
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
}
