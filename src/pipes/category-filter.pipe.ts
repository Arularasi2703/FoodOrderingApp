import { Pipe, PipeTransform } from '@angular/core';
import { FoodItem } from '../app/models/food-item';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {

  transform(items: FoodItem[], selectedCategory: string): FoodItem[] {
    if (!items) {
      return [];
    }
    
    if (!selectedCategory || selectedCategory === 'All') {
      return items;
    }
    
    return items.filter(item => item.category === selectedCategory);
  }

}
