import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {
  product: any;

  constructor(
    private router: Router, 
    private orderService: OrderService, 
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Retrieve the product data passed via navigation state
    this.product = history.state.product;
    
    // Optional: Handle cases where no product is available
    if (!this.product) {
      // Redirect to products page or show an error
      this.router.navigate(['/products']);
    }
  }

  placeOrder(product: any) {
    if (!product) {
      // Handle the case where product data is not available
      this.showErrorMessage('No product data available to place an order.');
      return;
    }

    // Logic to save the order
    this.orderService.createOrder(product).then(() => {
      this.showErrorMessage('Order placed successfully.');
      this.router.navigate(['/orders']);  // Redirect after placing the order
    }).catch(error => {
      console.error('Error placing order:', error);
    });
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
