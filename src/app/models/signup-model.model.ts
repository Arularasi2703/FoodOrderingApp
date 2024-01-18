import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { AccountService } from "../services/account.service";
import { emailAvailabilityValidator } from "../validators/email.validator";

export class UserModel {

  userId: number;  
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean; 
  RememberMe: boolean; 
  token: string;
  user: any;

  constructor() {
    this.userId = 0; 
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.isAdmin = false; 
    this.RememberMe = true; 
    this.token = '';
    this.user = null; 
  }

  static getValidationRules(accountService: AccountService): { [key: string]: any } {
    return {
      name: ['', [
        Validators.required,
        Validators.pattern('^[A-Z][a-zA-Z]{2,}\\s[A-Z][a-zA-Z\\s]*$'),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]],
      email: ['', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$'),
    ], [
      emailAvailabilityValidator(accountService) // Apply the custom async validator
    ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{6,}$'),
        Validators.minLength(6)
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchPasswordValidator() // Custom validator to check if password and confirmPassword match
      ]],
      isAdmin: [false], 
      rememberMe: [false] 
    };
  }

  private static matchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get('password')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { passwordsNotMatched: true };
    };
  }
}
