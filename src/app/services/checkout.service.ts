import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { AuthService } from './auth.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = environment.baseUrl;
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private logService: LogService
  ) {
    }

  addToCart(cartItem: CartItem): Observable<any> {
    const endpoint = environment.apiUrls.cart;
    return this.http.post(`${environment.baseUrl}${endpoint}`, cartItem, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => this.logService.logInfo(environment.messages.cartAddSuccess))
      );
  }

  increaseQuantity(itemId: number): Observable<any> {
    const errorMessage = environment.messages.cartIncreaseError;
    const endpoint = `${environment.apiUrls.cart}/${itemId}${environment.apiUrls.increaseQuantity}`;

    return this.http.post(`${this.baseUrl}${endpoint}`, null, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        this.logService.logErrorWithDetails(errorMessage, error);
        return throwError(errorMessage);
      }),
      tap(() => this.logService.logInfo(environment.messages.cartIncreaseSuccess))
    );
  }

  decreaseQuantity(itemId: number): Observable<any> {
    const errorMessage = environment.messages.cartDecreaseError;
    const endpoint = `${environment.apiUrls.cart}/${itemId}${environment.apiUrls.decreaseQuantity}`;

    return this.http.post(`${this.baseUrl}${endpoint}`, null, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        this.logService.logErrorWithDetails(errorMessage, error);
        return throwError(errorMessage);
      }),
      tap(() => this.logService.logInfo(environment.messages.cartDecreaseSuccess))
    );
  }

  removeCartItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${environment.apiUrls.cart}/${itemId}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => this.logService.logInfo(environment.messages.cartRemoveSuccess)),
        catchError((error: any) => {
          this.logService.logErrorWithDetails(environment.messages.cartRemoveError, error);
          return throwError(environment.messages.cartRemoveError);
        })
      );
  }

  public fetchCartItems(): void {
    this.getCartItems().subscribe(
      (cartItems: any) => {
        this.cartItemsSubject.next(cartItems);
      },
      (error: any) => {
        this.logService.logErrorWithDetails(environment.messages.cartFetchFailure, error);
      }
    );
  }

  private getCartItems(): Observable<CartItem[]> {
    const userId = this.authService.getCurrentUser()?.userId;
    const url = `${this.baseUrl}${environment.apiUrls.cart}/${userId}`;
    const errorMessage = environment.messages.cartFetchFailure;
    return this.http.get<CartItem[]>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError((error: any) => {
        this.logService.logErrorWithDetails(errorMessage, error);
        return throwError(errorMessage);
      })
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set(environment.authHeaders.authorization, `${environment.authHeaders.bearerToken} ${token}`);
  }
}
