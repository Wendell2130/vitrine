import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  const token=localStorage.getItem('token');
  if(authService.isLoggedIn() && token){
     return true;
  }
  alert("acesso a rota negado!")
  router.navigate(['login']);
  return false;
};
