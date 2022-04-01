import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'src/app/generic/services/message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client side error
          this.messageService.showErrorMessage(
            'Opss! Erro inesperado no navegador.'
          );
        } else {
          // Server side error
          if (error instanceof HttpErrorResponse) {
            if (error.status === HttpStatusCode.Unauthorized) {
              this.messageService.showSuccessMessage(
                'Bad credentials, Try Again.'
              );
              setTimeout(() => {
                this.authService.logoff();
                window.location.reload();
              }, 2000);
            } else if (error.status === HttpStatusCode.Forbidden) {
              this.messageService.showErrorMessage(error.error);
            } else if (error.status === HttpStatusCode.BadRequest) {
              this.messageService.showErrorMessage(error.error);
            } else {
              this.messageService.showErrorMessage(
                `Unexpected error: (${error.status})`
              );
            }
          } else {
            this.messageService.showErrorMessage('Unexpected error on server.');
          }
        }

        return throwError(error);
      })
    );
  }
}
