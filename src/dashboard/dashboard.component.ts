import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  foodItemCount: number;
  orderCount: number;
  paymentCount: number;
  userCount: number;

  constructor(private router: Router) {
    const counts = environment.dashboardCounts;
    this.foodItemCount = counts.foodItemCount;
    this.orderCount = counts.orderCount;
    this.paymentCount = counts.paymentCount;
    this.userCount = counts.userCount;
  }

  showMenuItem() {
    this.router.navigate([environment.routes.menuList]);
  }
}
