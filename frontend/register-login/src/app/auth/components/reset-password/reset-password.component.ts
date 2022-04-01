import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/generic/services/message.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  errorMessage = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.authService.hasToken()) {
      this.router.navigate(['/registerLogin']);
    }
  }

  onResetPass(): void {
    if (this.loginForm.valid) {
      this.authService.reset(this.loginForm.value).subscribe((data) => {
        this.messageService.showSuccessMessage(data.message);
        this.router.navigate(['/']);
      });
    }
  }
  onCancel() {
    this.router.navigate(['/']);
  }
}
