import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  errorMessage = '';
  loading = false;
  token: string | undefined;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.hasToken()) {
      this.router.navigate(['/registerLogin']);
    }
  }

  beforeSignin(): boolean {
    if (this.loginForm.valid) {
      if (
        this.loginForm.controls['username'].value === 'i' &&
        this.loginForm.controls['password'].value === 'forgot'
      ) {
        this.router.navigate(['/resetPass']);
        return false;
      } else {
        this.onSignIn();
        return true;
      }
    }
    return false;
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  onSignIn(): void {
    this.loading = !this.loading;
    this.authService.logon(this.loginForm.value).subscribe(() => {
      this.loading = !this.loading;
      this.router.navigate(['/registerLogin']);
    });
  }
}
