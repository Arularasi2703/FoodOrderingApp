import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { UserModel } from '../models/signup-model.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { NGXLogger } from 'ngx-logger';
import { LogService } from './log.service';
import { CartService } from './cart.service';
import { CartStateService } from './cart-state.service';
import { LoginModel } from '../models/login-model';
import { OtpVerificationModel } from '../models/otp-verification-model';
import { UserProfileModel } from '../models/user-profile-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = environment.baseUrl;
  private currentUserSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  public currentUser$: Observable<UserModel | null> = this.currentUserSubject.asObservable();
  private successMessageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public successMessage$: Observable<string | null> = this.successMessageSubject.asObservable();
  private signUpEmail: string | null = null;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private http:HttpClient,
    private authService:AuthService,
    private logger:NGXLogger,
    private logService:LogService,
    private cartService: CartService,
    private cartStateService: CartStateService
  ) { }
  checkEmailAvailability(email: string): Observable<boolean> {
    const url = `${this.baseUrl}${environment.apiUrls.isEmailAvailable}?email=${email}`;
    return this.http.get<boolean>(url).pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.log(error);
        this.logService.logErrorWithDetails(environment.messages.errorCheckingEmailAvailability, error);
        return throwError(error);
      })
    );
  }

  signup(signupData: UserModel): Observable<any> {
    this.signUpEmail = signupData.email;
    const url = `${this.baseUrl}${environment.apiUrls.signup}`;
    const jsonPayload = JSON.stringify(signupData);
    const headers = new HttpHeaders().set(environment.httpHeaders.contentType, environment.httpHeaders.json);
    return this.http.post(url, jsonPayload, { headers }).pipe(
      catchError(error => {
        // this.logger.error(environment.messages.signupError, error);
        this.logService.logErrorWithDetails(environment.messages.signupError, error);
        return throwError(environment.messages.signupError);
      })
    );
  }

  login(loginModel: LoginModel): Observable<UserModel> {
    const url = `${this.baseUrl}${environment.apiUrls.login}`;
    const jsonPayload = JSON.stringify(loginModel);
    const headers = new HttpHeaders().set(environment.httpHeaders.contentType, environment.httpHeaders.json);
    return this.http.post<UserModel>(url, jsonPayload, { headers }).pipe(
      tap(response => {
        this.authService.login(response.token, response.user);
        this.currentUserSubject.next(response.user);
        this.cartService.fetchCartItems();
        this.initializeCartComponents();
        this.setUserRole(response.user.isAdmin);
        this.setSuccessMessage(environment.messages.loginSuccessful); 
        // this.logger.info(environment.messages.loginSuccessful, response);
        this.logService.logInfo(environment.messages.loginSuccessful);
      }),
      catchError(error => {
        console.log(error);
        this.logService.logErrorWithDetails(environment.messages.loginFailure, error);
        throw error; 
      })
    );
  }

  private setUserRole(isAdmin: boolean): void {
    const userRole = isAdmin ? environment.userRoles.admin : environment.userRoles.user;
    localStorage.setItem(environment.userRoleLocalStorageKey, userRole);
  }

  getUserRole(): string | null {
    return localStorage.getItem(environment.userRoleLocalStorageKey);
  }

  getCurrentUser(): UserModel | null {
    return this.currentUserSubject.value;
  }

  getUserId(): number | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.userId : null;
  }

  logout(): void {
    localStorage.removeItem(environment.localStorageKeys.token);
    this.currentUserSubject.next(null);
  }

  setSuccessMessage(message: string): void {
    this.successMessageSubject.next(message);
  }

  clearSuccessMessage(): void {
    this.successMessageSubject.next(null);
  }

  // getUserProfile(userId: number): Observable<UserProfileModel> {
  //   const url = `${this.baseUrl}${environment.apiUrls.userProfile}/${userId}`;
  //   return this.http.get<UserProfileModel>(url);
  // }

  getUserProfile(userId: number): Observable<UserProfileModel> {
    const url = `${this.baseUrl}${environment.apiUrls.userProfile}/${userId}`;
    const errorMessage = environment.messages.userProfileFetchError;

    return this.http.get<UserProfileModel>(url).pipe(
      catchError(error => {
        this.logService.logErrorWithDetails(errorMessage, error);
        return throwError(errorMessage);
      })
    );
  }

  updateUserProfile(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}${environment.apiUrls.userProfile}`;
    const errorMessage = environment.messages.updateUserProfileError;

    return this.http.post(url, formData).pipe(
      catchError(error => {
        this.logService.logErrorWithDetails(errorMessage, error);
        return throwError(errorMessage);
      })
    );
  }

  resendOtp(): Observable<any> {
    const url = `${this.baseUrl}${environment.apiUrls.resendOtp}`;
    const errorMessage = environment.messages.resendOtpError;

    return this.http.post(url, null).pipe(
      catchError(error => {
        this.logService.logErrorWithDetails(errorMessage, error);
        return throwError(errorMessage);
      })
    );
  }

  verifyOtp(otp: string): Observable<any> {
    const url = `${this.baseUrl}${environment.apiUrls.verifyOtp}`;
    const otpVerificationData = new OtpVerificationModel(
      this.signUpEmail!,
      otp
    );
    const errorMessage = environment.messages.verifyOtpError;

    return this.http.post(url, otpVerificationData).pipe(
      catchError(error => {
        this.logService.logErrorWithDetails(errorMessage, error);
        return throwError(errorMessage);
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeCartComponents(): void {
    
      this.cartStateService.subscribeToCartItems();
  }
}














