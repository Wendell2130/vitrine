import { HttpClient } from '@angular/common/http';
import {  effect, inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { Icart } from '../../models/cart-interface';

import { Iproduct } from '../../models/product-interface';
import { CartView } from '../../models/cart-view-intercface';
import { AuthService } from './auth-service';

const URL = 'https://fakestoreapi.com/';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _http = inject(HttpClient);
  private _authService = inject(AuthService);
  
  public productsInCart = signal<Iproduct[]>([]);

  constructor(){
    effect(()=>{
      this._authService.isLoggedIn();
      this.productsInCart.set([]);
    });
  }
 
   //histórico de compras
  getCartsViewByIdUser(userId: number): Observable<CartView[] | null> {
    return this._http.get<CartView[]>(URL + 'carts/user/' + userId).pipe(
      switchMap(carts => {
        const cartWithDetails$ = carts.map(cart => {
          const productDetails$ = cart.products.map((item: any) =>
            this._http.get(URL + 'products/' + item.productId).pipe(
              map((product: any) => ({
                productId: item.productId,
                quantity: item.quantity,
                title: product.title,
                price: product.price,
                image: product.image
              }))
            )
          );
         
          return forkJoin(productDetails$).pipe(
            map(products => ({
              ...cart,
              products
            }))
          );
        });

        return forkJoin(cartWithDetails$);
      })
    );
  }


  
}
