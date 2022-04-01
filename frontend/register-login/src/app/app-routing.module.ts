import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { PageNotFoundComponent } from './generic/components/page-not-found/page-not-found.component';
import {
  RegisterLoginCreateComponent,
} from './register-login/components/register-login-create/register-login-create.component';
import { RegisterLoginGridComponent } from './register-login/components/register-login-grid/register-login-grid.component';
import {
  RegisterLoginUpdateComponent,
} from './register-login/components/register-login-update/register-login-update.component';
import { UsersGridComponent } from './users/components/users-grid/users-grid.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'resetPass', component: ResetPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'registerLogin', component: RegisterLoginGridComponent },
  { path: 'registerLogin/update/:id', component: RegisterLoginUpdateComponent },
  { path: 'registerLogin/create', component: RegisterLoginCreateComponent },
  { path: 'users', component: UsersGridComponent },

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
