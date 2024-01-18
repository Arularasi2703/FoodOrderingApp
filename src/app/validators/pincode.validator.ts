import { AbstractControl, ValidatorFn } from '@angular/forms';

export function pincodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && (isNaN(value) || value < 100000 || value > 999999)) {
      return { invalidPincode: true };
    }
    return null;
  };
}
