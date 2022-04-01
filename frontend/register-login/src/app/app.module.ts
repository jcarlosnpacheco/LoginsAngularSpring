import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { GenericModule } from './generic/generic.module';
import { AuthInterceptor } from './generic/interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './generic/interceptors/http-error.interceptors';
import { LoadingInterceptor } from './generic/interceptors/loading.interceptor';
import { MaterialModule } from './generic/material.module';
import { RegisterLoginModule } from './register-login/register-login.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FlexLayoutModule,
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    GenericModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    RegisterLoginModule,
    MatProgressSpinnerModule,
    UsersModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
