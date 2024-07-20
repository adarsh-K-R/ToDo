import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
  ngOnInit(): void { 
    if(this.authService.isAuthenticated()) {
      this.router.navigate([""]);
    }
  }

  toggleProperty = false;
  signinPasswordType = "password";
  signupPasswordType = "password";
  isSignInPasswordVisible = false;
  isSignUpPasswordVisible = false;
  toastMessage: string = '';
  toastType: string = 'info';
  toastDuration: number = 5000;
  showToast: boolean = false;

  signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  signupForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })


  toggleSigninPassword() {
    this.signinPasswordType = this.signinPasswordType === "password" ? "text" : "password";
    this.isSignInPasswordVisible = !this.isSignInPasswordVisible;
  }

  toggleSignupPassword() {
    this.signupPasswordType = this.signupPasswordType === "password" ? "text" : "password";
    this.isSignUpPasswordVisible = !this.isSignUpPasswordVisible;
  }

  get imgSrcSignIn() {
    return this.isSignInPasswordVisible
      ? '../../../../assets/images/authentication/password_visible.svg'
      : '../../../../assets/images/authentication/password_hidden.svg';
  }

  get imgSrcSignUp() {
    return this.isSignUpPasswordVisible
      ? '../../../../assets/images/authentication/password_visible.svg'
      : '../../../../assets/images/authentication/password_hidden.svg';
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

  signin() {
    if (!this.signinForm.invalid) {
      let username = this.signinForm.value.username!;
      let password = this.signinForm.value.password!;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/']);
          } else {
            this.showToastMessage("Login Failed!", "failure", 4000);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.showToastMessage("Login Failed!", "failure", 4000);
        }
      });
    }
  }

  signup() {
    if (!this.signupForm.invalid) {
      let username = this.signupForm.value.username!;
      let password = this.signupForm.value.password!;
      this.authService.register(username, password).subscribe({
        next: (response) => {
          if (response === 'User already exists') {
            this.showToastMessage("User already exists!", "warning", 4000);
          } else if (!response) {
            this.showToastMessage("Signup Successfully Done!", "success", 4000);
            this.signupForm.reset();
            this.toggle();
          }
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.showToastMessage("Registration failed", "error", 4000);
        }
      });
    }
  }
  
  showToastMessage(message: string, type: string, duration: number): void {
    this.toastMessage = message;
    this.toastType = type;
    this.toastDuration = duration;
    this.showToast = true;

    setTimeout(() => {
        this.showToast = false;
    }, duration);
  }

}