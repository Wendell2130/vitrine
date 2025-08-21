import { inject, Injectable, signal } from '@angular/core';
import { Iproduct } from '../../models/product-interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
const URL="https://fakestoreapi.com/products/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private _http=inject(HttpClient);

  public getProducts():Observable<Iproduct[]>{
    return this._http.get<Iproduct[]>(URL);
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
