import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-product-component',
  standalone: false,
  templateUrl: './new-product-component.html',
  styleUrl: './new-product-component.scss'
})
export class NewProductComponent {
productForm: FormGroup;
route=inject(ActivatedRoute);
router=inject(Router);
 mode='create';

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
     
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      image: ['http://example.com', [Validators.required, Validators.minLength(3)]]
    });
  }
 
  ngOnInit() {
   
    const id = this.route.snapshot.paramMap.get('id');
    const urlSegments = this.route.snapshot.url;
    const firstSegment = urlSegments[0]?.path; // 'new' ou 'edit'
    if (firstSegment === 'new') {
      this.mode = 'create';
    } else if (firstSegment === 'edit' && id) {
      this.mode = 'edit';
      this.productService.getProductById(+id).subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
        },
        error: () => alert('Erro ao carregar produto para edição!')
      });
    }
  }
  
  submit() {
    if(this.mode === 'create') {
     
      this.productService.createProduct(this.productForm.value).subscribe(()=>{
        alert('Produto cadastrado com sucesso!');
      })
      this.productForm.reset({ title: '', price: 0, description: '', category: '', image: 'http://example.com' });
    }
    else if(this.mode === 'edit') {
     
      this.productService.updateProduct(this.route.snapshot.paramMap.get('id') as unknown as number,
       this.productForm.value).subscribe(()=>{
        alert('Produto atualizado com sucesso!');
         this.productForm.reset({ title: '', price: 0, description: '', category: '', image: 'http://example.com' });
         this.goBack();
       });
     
    }
    
   }
   goBack() {
    this.router.navigate(['/admin/table']);
  }
}
