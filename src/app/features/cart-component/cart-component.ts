import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { Icart } from '../../models/cart-interface';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss'
})
export class CartComponent {
  cartService=inject(CartService);
  authService=inject(AuthService)
  cartsByUser$:Observable<Icart[] | null> = of(null);
  
  ngOnInit(){
    const idUser=this.authService.currentUser()?.id;
    if(idUser){
      this.cartsByUser$=this.cartService.getCartsByIdUser(idUser);
    
    }
   
  }
}
