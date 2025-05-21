import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FlexModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  searchTerm: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder:string='';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      },
    });
  }
  addToCart(Product: Product) {
    this.cartService.addToCart(Product).subscribe({
      next: () => {
        this.snackBar.open('Product added to cart', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        console.error('Error adding product to cart', error);
      },
    });
  }
  applyFilter(event: Event) {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;

    if(this.sortOrder == "priceLowHigh"){
       this.filteredProducts.sort((a,b)=>
        a.price - b.price
       )
    }else if(this.sortOrder == "priceHighLow"){
      this.filteredProducts.sort((a,b) => b.price - a.price)
    }
  }
}
