import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { InvoiceDetails } from '../models/invoice-details';
import { environment } from '../../environments/environment';
import { LogService } from './log.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.orderApiUrl; 
  private orderHistoryEndpoint = environment.apiUrls.orderHistory;

  constructor(private http: HttpClient,private logService :LogService) {}

  getOrderHistory(userId: number): Observable<InvoiceDetails[]> {
    const url = `${this.apiUrl}${this.orderHistoryEndpoint}?userId=${userId}`;
    return this.http.get<InvoiceDetails[]>(url).pipe(
      tap(() => {
        this.logService.logInfo(environment.messages.getOrderHistorySuccess);
      }),
      catchError((error) => {
        this.logService.logErrorWithDetails(environment.messages.getOrderHistoryError, error);
        return throwError(environment.messages.getOrderHistoryError);
      })
    );
  }
}











