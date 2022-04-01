import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/generic/services/message.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;
  errorMessage = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    roles: [null],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSignup(): void {
    if (this.loginForm.valid) {
      this.authService.signup(this.loginForm.value).subscribe((data) => {
        this.messageService.showSuccessMessage(data.message);
        this.router.navigate(['/']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
