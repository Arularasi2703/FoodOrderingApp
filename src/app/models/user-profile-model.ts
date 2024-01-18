// export class UserProfileModel {
//   profileId!: number;
//   userid: number | undefined;
//   name!: string;
//   email!: string;
//   mobileNumber!: string;
//   address!: string;
//   pincode!: number;
//   profilePicture!: string;
// }
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { pincodeValidator } from '../validators/pincode.validator';

export class UserProfileModel {
  profileId!: number;
  userid: number | undefined;
  name!: string;
  email!: string;
  mobileNumber!: string;
  address!: string;
  pincode!: number;
  profilePicture!: string;

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
        Validators.pattern('^\\+91[6-9]\\d{9}$')
      ]],
      address: [],
      pincode: ['', [
        // Validators.pattern('^[1-9]\\d{5}$')
        pincodeValidator()
      ]]
    };
  }
}

