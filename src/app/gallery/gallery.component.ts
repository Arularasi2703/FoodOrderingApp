import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { FoodItem } from '../models/food-item';
import { Subscription } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  galleryItems: FoodItem[] = [];
  private gallerySubscription: Subscription | undefined;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.fetchGalleryItems();
  }

  fetchGalleryItems(): void {
    this.gallerySubscription = this.menuService.getGalleryItems().subscribe(
      (items: FoodItem[]) => {
        this.galleryItems = items;
      },
      (error: any) => {
        // Handle error here (e.g., show error message)
      }
    );
  }

  getBase64Image(base64String: string): string {
    console.log(environment.userProfileFields.base64Prefix + base64String);
    return environment.userProfileFields.base64Prefix + base64String;
  }

  ngOnDestroy(): void {
    if (this.gallerySubscription) {
      this.gallerySubscription.unsubscribe();
    }
  }
}
