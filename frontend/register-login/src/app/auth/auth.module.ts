import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GenericModule } from './../generic/generic.module';
import { MaterialModule } from './../generic/material.module';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    GenericModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    SignupComponent,
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    SignupComponent,
  ],
})
export class AuthModule {}
