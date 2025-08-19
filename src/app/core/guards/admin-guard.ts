import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  const token=localStorage.getItem('token');
  
  if(authService.isLoggedIn() && token && authService.currentUser()?.id === 1) {
     return true;
  }
  alert("Usuário não é administrador!")
  router.navigate(['login']);
  return false;
 
};
