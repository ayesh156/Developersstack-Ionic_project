import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: any[] = [];

  constructor(private orderService:OrderService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadOrders();
  }

  placeOrder() {
   
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(orderData => {
      this.orders = orderData.map(order => ({
        id: order.payload.doc.id,
        ...order.payload.doc.data()
      }));
    }, error => {
      console.error('Error loading orders:', error);
    });
  }

  deleteOrder(orderId: any) {
    this.orderService.deleteOrder(orderId).then(() => {
      this.showErrorMessage('Order deleted successfully.');
      this.loadOrders();  // Reload orders after deletion
    }).catch(error => {
      console.error('Error deleting order:', error);
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
