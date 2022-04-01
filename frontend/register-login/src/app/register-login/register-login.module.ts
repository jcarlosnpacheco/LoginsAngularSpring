import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GenericModule } from './../generic/generic.module';
import { RegisterLoginCreateComponent } from './components/register-login-create/register-login-create.component';
import { RegisterLoginGridComponent } from './components/register-login-grid/register-login-grid.component';
import { RegisterLoginInputComponent } from './components/register-login-input/register-login-input.component';
import { RegisterLoginUpdateComponent } from './components/register-login-update/register-login-update.component';

@NgModule({
  imports: [
    CommonModule,
    GenericModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ClipboardModule,
  ],

  declarations: [
    RegisterLoginGridComponent,
    RegisterLoginInputComponent,
    RegisterLoginCreateComponent,
    RegisterLoginUpdateComponent,
  ],
})
export class RegisterLoginModule {}
