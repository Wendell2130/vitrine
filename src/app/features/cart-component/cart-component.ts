import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { Icart } from '../../models/cart-interface';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth-service';
import { CartView, ProductView } from '../../models/cart-view-intercface';
import { ProductService } from '../../core/services/product-service';
import { Iproduct } from '../../models/product-interface';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  productService = inject(ProductService);
  cartsView$: Observable<CartView | null> = of(null);
  obj$:Observable<{cart:Icart,products:Iproduct}[] | null> = of(null);
  // products1:ProductView[]=[{productId:1,image:'',title:'product1',quantity:1,price:100},
  //   {productId:2,image:'',title:'product2',quantity:2,price:100}
  // ];
  // products2:ProductView[]=[{productId:3,image:'',title:'product1',quantity:5,price:100},
  //   {productId:2,image:'',title:'product2',quantity:12,price:100}
  // ];
  // carts:CartView[]=[{id:0,userId:1,date:'2023-01-01',products:this.products1,totalBuy:50},
  //   {id:1,userId:1,date:'2023-01-01',products:this.products2,totalBuy:200}];


  ngOnInit() {
    const idUser = this.authService.currentUser()?.id;
    if (idUser) {


    this.cartService.getCartsViewByIdUser(idUser).
    subscribe(carts=>console.log(carts));
     
      
    } else {
      alert('usuário não logado ao acessar o carrinho');
    }

  }
}
