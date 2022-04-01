import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageComponent } from '../components/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private snackBar: MatSnackBar) { }
showErrorMessage(message: string): void {
  this.snackBar.openFromComponent(MessageComponent, {
    data: {
      message,
      type: 'error'
    },
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
  });
}

showSuccessMessage(message: string): void {
  this.snackBar.openFromComponent(MessageComponent, {
    data: {
      message,
      type: 'success'
    },
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: 'success-snackbar'
  });
}

showWarningMessage(message: string): void {
  this.snackBar.openFromComponent(MessageComponent, {
    data: {
      message,
      type: 'warning'
    },
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['warning-snackbar']
  });
}
}
