import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'src/app/generic/services/message.service';
import { ValidateFormFieldsService } from 'src/app/generic/services/validate-form-fields.service';

import { RegisterLoginService } from './../../services/register-login.service';

@Component({
  selector: 'app-register-login-input',
  templateUrl: './register-login-input.component.html',
  styleUrls: ['./register-login-input.component.css'],
})
export class RegisterLoginInputComponent implements OnInit {
  @Input() titlePage: string;
  @Input() submitButton: string;
  @Input() registerLoginId: number;
  @Output() submitted = new EventEmitter<any>();

  registerLoginForm: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private message: MessageService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private router: Router,
    private registerLogin: RegisterLoginService,
    private authService: AuthService
  ) {
    this.titlePage = '';
    this.submitButton = '';
    this.registerLoginId = 0;
  }

  ngOnInit() {
    if (this.registerLoginId > 0) {
      this.registerLogin
        .getById(
          Number(this.authService.getIdFromToken()),
          this.registerLoginId
        )
        .subscribe((register) => {
          this.registerLoginForm.patchValue(register);
        });
    }

    this.createForm(this.registerLoginId);
  }

  createForm(registerLoginId: number) {
    const userId = this.authService.getIdFromToken();

    this.registerLoginForm = this.fb.group({
      id: [registerLoginId],
      loginName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(120)]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(1000)]),
      ],
      observation: [' ', Validators.compose([Validators.maxLength(1000)])],
      userId: [userId],
    });
  }

  onSubmit(): void {
    if (this.registerLoginForm.valid) {
      this.submitted.emit(this.registerLoginForm);
    } else {
      this.validateFormFieldsService.validateAllFormFields(
        this.registerLoginForm
      );
      this.message.showWarningMessage('Invalid Form');
    }
  }

  onReset(form: FormGroupDirective): void {
    form.resetForm();
  }

  onCancel(): void {
    this.router.navigate(['/registerLogin']);
  }
}
