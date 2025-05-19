import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css',
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.totalPrice = this.getTotalPrice();
      },
      error: (error) => {
        console.error('Error fetching cart items', error);
      },
    });
  }
  getTotalPrice(): number {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return this.totalPrice;
  }
  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
        this.totalPrice = 0;
      },
      error: (error) => {
        console.error('Error clearing cart', error);
      },
    });
  }

  checkout(): void {
    this.cartService.checkout(this.cartItems).subscribe({
      next: () => {
        // alert('Checkout successful!');
        this.clearCart();
      },
      error: (error) => {
        console.error('Error during checkout', error);
      },
    });
  }
}
