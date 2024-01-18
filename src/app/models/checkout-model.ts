import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export class CheckoutModel {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  pinCode: string;
  userId: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.mobileNumber = '';
    this.address = '';
    this.pinCode = '';
    this.userId = 0;
  }

  static getValidationRules(): { [key: string]: any } {
    return {
      name: ['', [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z]{2,}\\s[A-Z][a-zA-Z\\s]*$')
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$')
      ]],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern('^\\+91[6-9]\\d{9}$')
      ]],
      address: ['', Validators.required],
      pinCode: ['', [
        Validators.required,
        Validators.pattern('^[1-9]\\d{5}$')
      ]],
      userId: [0]
    };
  }
}
