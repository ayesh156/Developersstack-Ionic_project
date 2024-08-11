import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore:AngularFirestore,private storage:AngularFireStorage) { }

  createOrder(product: any): Promise<any> {
    // Destructure the product object and exclude 'id'
    const { id, ...orderData } = product;

    // Create the order object without the 'id'
    const order = {
      ...orderData,
      createdAt: new Date()  // Optionally include a timestamp
    };

    // Add the order to the Firestore collection
    return this.firestore.collection('orders').add(order);
  }

  getOrders(): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection('orders', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges();
  }

  deleteOrder(orderId: any): Promise<void> {
    return this.firestore.collection('orders').doc(orderId).delete();
  }
}
