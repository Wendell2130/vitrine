import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list-component/product-list-component';
import { LoginComponent } from './features/login-component/login-component';
import { ProductDetailComponent } from './features/product-detail-component/product-detail-component';

import { CartComponent } from './features/cart-component/cart-component';
import { AdminComponent } from './features/admin/admin-component/admin-component';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { About } from './features/about/about';


const routes: Routes = [
    { path: '',redirectTo:'home',pathMatch:'full'},
  { path: 'home',component:ProductListComponent},
  
  { path: 'login',component:LoginComponent },
  { path: 'product/:id',component:ProductDetailComponent },
  { path: 'cart',component:CartComponent},
  { path: 'about',component:About },
  { path: 'admin',loadChildren: () => 
    import('./features/admin/admin-module').then(m => m.AdminModule), 
    canActivate:[adminGuard] },
 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
