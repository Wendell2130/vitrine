import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin-component/admin-component';
import { NavbarAdmimComponent } from './navbar-admim-component/navbar-admim-component';
import { NewProductComponent } from './new-product-component/new-product-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule, Routes } from '@angular/router';
import { TableProductComponent } from './table-product-component/table-product-component';

const routes: Routes = [
  { path: '', component: AdminComponent, 
      children: [
      { path: 'table', component: TableProductComponent },
      { path: 'new', component: NewProductComponent },
      { path: 'edit/:id', component: NewProductComponent },
      { path: '', redirectTo: 'table', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  declarations: [
    AdminComponent,
    NavbarAdmimComponent,
    NewProductComponent,
    TableProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
