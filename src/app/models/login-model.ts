import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export class LoginModel {
  email: string;
  password: string;
  rememberMe: boolean;
  isAdmin: boolean;

  constructor() {
    this.email = '';
    this.password = '';
    this.rememberMe = false;
    this.isAdmin = false;
  }

  static getValidationRules(): { [key: string]: any } {
    return {
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$')
      ]],
      password: ['', [
        Validators.required
      ]],
      rememberMe: [false],
      isAdmin: [false]
    };
  }
}
