import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { Icart } from '../../models/cart-interface';
import { ProductService } from './product-service';
import { Iproduct } from '../../models/product-interface';
import { CartView, ProductView } from '../../models/cart-view-intercface';
const URL = 'https://fakestoreapi.com/';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _http = inject(HttpClient);
  
  private _currentCart = signal<Icart | null>(null);
  public currentCart = this._currentCart.asReadonly();
  public productsInCart = signal<Iproduct[]>([]);
  

  createCart(cart: Icart): Observable<Icart> {
    return this._http.post<Icart>(URL + 'carts', cart);
  }

  getCartById(cartId: number): Observable<Icart> {
    return this._http.get<Icart>(URL + 'carts/' + cartId);
  }

  updateCart(cartId: number, cart: Partial<Icart>): Observable<Icart> {
    return this._http.put<Icart>(URL + 'carts/' + cartId, cart);
  }

  deleteCart(cartId: number): Observable<any> {
    return this._http.delete(URL + 'carts/' + cartId);
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


  // addProductToCart(userId:number, productId: number): Observable<> {
  //   return this._http.post(URL, {});
  // }
  removeProduct() {

  }
}
