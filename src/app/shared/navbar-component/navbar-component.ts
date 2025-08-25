import { Component, inject, } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {
  public authService=inject(AuthService);
  public cartService=inject(CartService);
  logout(){
    this.authService.logout();
  }
}
