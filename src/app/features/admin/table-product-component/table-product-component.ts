import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { Router } from '@angular/router';
import { Iproduct } from '../../../models/product-interface';

@Component({
  selector: 'app-table-product-component',
  standalone: false,
  templateUrl: './table-product-component.html',
  styleUrl: './table-product-component.scss'
})
export class TableProductComponent {

  productsService = inject(ProductService);
  router = inject(Router);
  filteredProducts:Signal<Iproduct[]> = signal([]);

  ngOnInit(): void {
    this.filteredProducts=computed(()=> //não muda o array original e usa sort
      [...this.productsService.filteredProducts()].sort((a,b)=>a.title.localeCompare(b.title)));
  }
  
  filterPerCategory(){
    this.filteredProducts=computed(()=> //não muda o array original e usa sort
      [...this.productsService.filteredProducts()].sort((a,b)=>a.category.localeCompare(b.category)));
  }
    filterPerPrice(){
    this.filteredProducts=computed(()=> //não muda o array original e usa sort
      [...this.productsService.filteredProducts()].sort((a, b) => a.price - b.price));
  }
    filterPerName(){
    this.filteredProducts=computed(()=> //não muda o array original e usa sort
      [...this.productsService.filteredProducts()].sort((a,b)=>a.title.localeCompare(b.title)));
  }

  editProduct(id: number) {
      this.router.navigate(['/admin/edit', id]);
  
  }

  deleteProduct(id: number) {
    const confirmDelete = confirm('Deseja Realmente Excluir o Produto?');
    if (confirmDelete) {
      this.productsService.removeProduct(id).subscribe({
        next: () => {
          alert('Produto excluído com sucesso!');
        },
        error: () => {
          alert('Erro ao excluir produto!');
        }
      });
    }
    
  }



}
