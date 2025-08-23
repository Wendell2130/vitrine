import { inject, Injectable, signal } from '@angular/core';
import { Iproduct } from '../../models/product-interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
const URL="https://fakestoreapi.com/products/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private _http=inject(HttpClient);
  private _products=signal<Iproduct[]>([]);
  public products=this._products.asReadonly();
  constructor() { 
    this.getProducts();
  }

  public getProducts():Observable<any[]>{
    return this._http.get<Iproduct[]>(URL).pipe(tap((products)=>{
      this._products.set(products);
      console.log(this._products());
    }));
  }
   public getProductById(id:number):Observable<Iproduct>{
    return this._http.get<Iproduct>(URL+id);
  }
  public getProductNameById(idProduct:number): Observable<string> {
    return this._http.get<Iproduct>(URL+idProduct).pipe(map((product)=>{

      return product.title;
    }));
  }
  
}
