import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { FoodItem } from '../models/food-item';
import { environment } from '../../environments/environment';
import { FoodCategory } from '../models/food-category';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment.menuApiUrl;
  private categoriesEndpoint = environment.apiUrls.categories;
  private galleryEndpoint = environment.apiUrls.gallery;

  private cachedMenuItems: FoodCategory[] | null = null;

  constructor(
    private http: HttpClient,
    private logService :LogService
    ) {}

    getAllFoodItems(): Observable<FoodCategory[]> {
      if (this.cachedMenuItems) {
        return of(this.cachedMenuItems);
      } else {
        return this.http.get<FoodCategory[]>(`${this.apiUrl}${this.categoriesEndpoint}`).pipe(
          tap((data: FoodCategory[]) => {
            this.cachedMenuItems = data;
          }),
          tap(() => this.logService.logInfo(environment.messages.menuFetchSuccess)),
          catchError(error => {
            this.logService.logErrorWithDetails(environment.messages.menuFetchError, error);
            return throwError(environment.messages.menuFetchError);
          })
        );
      }
    }

  // addFoodItem(formData: FormData): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, formData);
  // }

  addFoodItem(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      tap(() => this.logService.logInfo(environment.messages.addFoodItemSuccess)),
      catchError(error => {
        this.logService.logErrorWithDetails(environment.messages.addFoodItemError, error);
        return throwError(environment.messages.addFoodItemError);
      })
    );
  }


  getFoodItem(id: number): Observable<FoodItem> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<FoodItem>(url).pipe(
      tap(() => this.logService.logInfo(environment.messages.getFoodItemSuccess)),
      catchError(error => {
        this.logService.logErrorWithDetails(environment.messages.getFoodItemError, error);
        return throwError(environment.messages.getFoodItemError);
      })
    );
  }

  // updateFoodItem(foodItem: FoodItem): Observable<any> {
  //   const url = `${this.apiUrl}/${foodItem.id}`;
  //   return this.http.put<any>(url, foodItem);
  // }

  updateFoodItem(foodItem: FoodItem): Observable<any> {
    const url = `${this.apiUrl}/${foodItem.id}`;
    return this.http.put<any>(url, foodItem).pipe(
      tap(() => this.logService.logInfo(environment.messages.editFoodItemSuccess)),
      catchError(error => {
        this.logService.logErrorWithDetails(environment.messages.editFoodItemError, error);
        return throwError(environment.messages.editFoodItemError);
      })
    );
  }

  // deleteFoodItem(id: number): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<any>(url);
  // }

  deleteFoodItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      tap(() => this.logService.logInfo(environment.messages.deleteFoodItemSuccess)),
      catchError(error => {
        this.logService.logErrorWithDetails(environment.messages.deleteFoodItemError, error);
        return throwError(error); 
      })
    );
  }

  getGalleryItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.apiUrl}${this.galleryEndpoint}`).pipe(
      tap(() => this.logService.logInfo(environment.messages.galleryFetchSuccess)),
      catchError(error => {
        this.logService.logErrorWithDetails(environment.messages.galleryFetchError, error);
        return throwError(environment.messages.galleryFetchError);
      })
    );
  }
}
