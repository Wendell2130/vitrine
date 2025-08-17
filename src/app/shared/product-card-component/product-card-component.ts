import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card-component',
  standalone: false,
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.scss'
})
export class ProductCardComponent {
  private _router=inject(Router);
  @Input({ required: true }) id: number = 0;
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) description: string = '';
  @Input({ required: true }) image: string = '';
  @Input({ required: true }) price: number = 0;

  goToProduct(id:number){
    this._router.navigate([`/product/${id}`]);
  }
}
