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
    //efeito colateral para resetar o atual carrinho na troca de usuário
    effect(()=>{
      this._authService.isLoggedIn();
      this.productsInCart.set([]); 
    });
   
  }

  getTotalItensInCart():number{
    return this.productsInCart().reduce((sum, product) => 
      sum + (product.quantity ?? 1), 0);
  }
  sendCartToApi(){
    if(this._authService.currentUser()?.id){
      if(this.productsInCart().length>=1){
      const userId = this._authService.currentUser()?.id;
      const newCart = { id:11,userId: userId, products: this.productsInCart() };
       this._http.post(URL + 'carts/', newCart).subscribe(()=>{
        alert('Carrinho enviado com sucesso! Requisição efetuada na API');
        this.productsInCart.set([]); 
       });

      }else{
        alert('Carrinho Vazio!');
        return;
      }
    }
    
    const cart = this.productsInCart();
    
  }
   //monta objeto CartView com histórico de compras
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
