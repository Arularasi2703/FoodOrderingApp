import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModel } from '../models/login-model';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { LogService } from '../services/log.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  model: LoginModel;
  passwordVisible: boolean = false;
  showInvalidCredentialsMessage: boolean = false;
  showSuccessfulLoginMessage: boolean = false;
  loginError = environment.messages.loginError;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private logService :LogService
  ) {
    this.model = new LoginModel();
    this.loginForm = this.formBuilder.group(LoginModel.getValidationRules());
  }

  ngOnInit() {
    // Clear toastr messages on initialization
    this.toastr.clear();
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     this.accountService.login(this.loginForm.value)
  //       .pipe(takeUntil(this.unsubscribe$))
  //       .subscribe(
  //         (response: any) => {
  //           this.showSuccessfulLoginMessage = true;
  //           this.showInvalidCredentialsMessage = false;
  //           this.redirectToMenuPage();
  //         },
  //         (error: { status: number; }) => {
  //           console.error(this.loginError, error);
  //           if (error.status === environment.httpStatusCodes.unauthorized) {
  //             this.logService.logErrorWithDetails(environment.messages.loginError, error);
  //             this.showInvalidCredentialsMessage = true;
  //             this.showSuccessfulLoginMessage = false;
  //           } else {
  //             this.toastr.error(this.loginError, environment.Error);
  //           }
  //         }
  //       );
  //   } else {
  //     // this.loginForm.markAllAsTouched();
  //     const formIsPristine = Object.keys(this.loginForm.controls).every(key => {
  //       const control = this.loginForm.get(key);
  //       return control?.pristine; // Check if the control is pristine
  //     });
  
  //     if (formIsPristine) {
  //       this.loginForm.markAllAsTouched();
  //     } else {
  //       this.loginForm.markAllAsTouched();
  //     }
  //   }
  //   setTimeout(() => {
  //     this.showInvalidCredentialsMessage = false;
  //     this.showSuccessfulLoginMessage = false;
  //   }, 1000);
  // }
  

  private redirectToMenuPage() {
    setTimeout(() => {
      this.router.navigate([environment.routes.menu]);
    }, 1000);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
