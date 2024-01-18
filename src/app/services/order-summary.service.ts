import { Injectable } from '@angular/core';
import { OrderDetails } from '../models/order-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  private orderSummarySource = new BehaviorSubject<OrderDetails[] | null>(null);
  private messageSource = new BehaviorSubject<string>('');

  orderSummary$ = this.orderSummarySource.asObservable();
  message$ = this.messageSource.asObservable();

  setOrderSummary(orderSummary: OrderDetails[]) {
    this.orderSummarySource.next(orderSummary);
  }

  setMessage(message: string) {
    this.messageSource.next(message);
  }

  clearOrderSummary() {
    this.orderSummarySource.next(null);
  }

  clearMessage() {
    this.messageSource.next('');
  }
}
