import { Component, inject, } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { CartService } from '../../core/services/cart-service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {
  public authService = inject(AuthService);
  public cartService = inject(CartService);
  private translate = inject(TranslateService);

  language(lang: 'pt' | 'en') {
    this.translate.use(lang);
  }

  logout() {
    this.authService.logout();
  }
}
