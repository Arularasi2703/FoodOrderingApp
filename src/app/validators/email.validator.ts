import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

export function emailAvailabilityValidator(accountService: AccountService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    const email = control.value;

    return of(email).pipe(
      switchMap((emailValue: string) => {
        return accountService.checkEmailAvailability(emailValue);
      }),
      map(isAvailable => {
        return isAvailable ? null : { emailTaken: true };
      }),
      catchError(() => of(null)) 
    );
  };
}
