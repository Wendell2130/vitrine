import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-navbar-component',
  standalone: false,
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {
  public authService=inject(AuthService);
  
  logout(){
    this.authService.logout();
  }
}
