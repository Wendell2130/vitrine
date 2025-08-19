import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Icart } from '../../models/cart-interface';
import { ProductService } from './product-service';
import { Iproduct } from '../../models/product-interface';
import { CartView } from '../../models/cart-view-intercface';
const URL = 'https://fakestoreapi.com/';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _http = inject(HttpClient);
  private _productService = inject(ProductService);

getCartsViewByIdUser(userId: number): Observable<any[]> {
  return this._http.get<any[]>(URL + 'carts/user/' + userId).pipe(
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






  getCartById(idCart: number) {
    return this._http.get(URL + idCart);
  }

  getTotalBuy() {

  }
  addProduct() {
    return this._http.post(URL, {});
  }
  removeProduct() {

  }
}
