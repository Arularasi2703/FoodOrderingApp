import { Validators, ValidatorFn } from '@angular/forms';

export class FoodItemModel {
  id: number = 0;
  name: string = '';
  price: number = 0;
  description: string = '';
  image: File | null = null;
  category: string = '';
  isVegan: boolean = false;
  calories: number = 0;

  static validationRules = {
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]{2}[a-zA-Z0-9 .]*$')]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    description: ['', Validators.required],
    image: [null, [Validators.required, allowedImageExtensions(['jpg', 'jpeg', 'png'])]],
    category: ['', Validators.required],
    isVegan: [false, Validators.required],
    calories: [0, [Validators.required, Validators.min(0)]]
  };
}

export function allowedImageExtensions(extensions: string[]): ValidatorFn {
  return (control) => {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      return extensions.includes(extension) ? null : { invalidExtension: true };
    }
    return null;
  };
}
