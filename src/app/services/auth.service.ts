import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/signup-model.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  public currentUser$: Observable<UserModel | null> = this.currentUserSubject.asObservable();
  public isLoggedIn = false;
  constructor(private router: Router) {}

  login(token: string, user: UserModel): void {
    localStorage.setItem(environment.localStorageKeys.token, token);
    this.isLoggedIn = true;
    this.currentUserSubject.next(user);
    this.router.navigate([environment.routes.menu]);
  }

  logout(): void {
    localStorage.removeItem(environment.localStorageKeys.token);
    this.isLoggedIn = false;
    this.currentUserSubject.next(null);
    
  }

  getToken(): string | null {
    return localStorage.getItem(environment.localStorageKeys.token);
  }

  getCurrentUser(): UserModel | null {
    return this.currentUserSubject.value;
  }
}
