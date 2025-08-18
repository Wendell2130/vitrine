import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Icart } from '../../models/cart-interface';
const URL_CART='https://fakestoreapi.com/carts/';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _http=inject(HttpClient);
  
  getCartsByIdUser(userId:number):Observable<Icart[] | null>{
    return this._http.get<Icart[]>(URL_CART).pipe(map((carts)=>{
      return carts.filter(cart=>cart.userId==userId)
    }));
  }
  getCartById(idCart:number){
    return this._http.get(URL_CART+idCart);
  }  
  getTotalBuy(){

  }
  addProduct(){

  }
  removeProduct(){

  }
}
