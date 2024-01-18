import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartStateService } from '../app/services/cart-state.service';
import { AccountService } from '../app/services/account.service';
import { UserModel } from '../app/models/signup-model.model';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  cartCount: number = 0;
  currentUser: UserModel | null = null; 

  constructor(
    private accountService: AccountService,
    private cartStateService: CartStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the currentUser$ observable to update the authentication status
    this.accountService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.isAdmin ?? false;
      this.currentUser = user; 
    });

    // Check the initial authentication status
    this.isAuthenticated = !!this.accountService.getCurrentUser();
    this.isAdmin = this.accountService.getCurrentUser()?.isAdmin ?? false;

    // Subscribe to the cartCount$ observable in cartStateService to get the cart count
    this.cartStateService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }
  
  logout(): void {
    this.accountService.logout();
    this.currentUser = null;
    this.router.navigate([environment.routes.menu]); 
  }
}
